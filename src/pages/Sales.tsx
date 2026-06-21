import React, { useEffect, useState } from "react";
import { Chart, type AxisOptions } from "react-charts";
import DataTable, { type TableColumn } from "react-data-table-component";
import Card from "../components/cards/Card";
import Text from "../components/typography/Text";
import { typography } from "../constants/typography";
import { spacing } from "../constants/spacing";
import { colors } from "../constants/colors";
import { getAllOrders } from "../services/firebase/orders/getAllOrders";
import Loader from "../components/loaders/Loader";

type SalesDatum = { primary: string; secondary: number };

const seriesColors = [
  colors.primary,
  colors.warning,
  colors.danger,
  colors.secondary,
  colors.primaryLight,
  colors.warningLight,
  colors.dangerLight,
  colors.successLight,
];

const getDateKey = (order: any) => {
  const created = order.createdAt;
  if (created && typeof created === "object" && "_seconds" in created) {
    return new Date(created._seconds * 1000).toLocaleDateString();
  }
  if (created) {
    return new Date(created).toLocaleDateString();
  }
  return "Sin fecha";
};

const Sales = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Ventas - Comercializadora Nova";
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const items = React.useMemo(() => {
    const itemsMap = new Map<
      string,
      { name: string; quantity: number; amount: number }
    >();
    orders.forEach((order) => {
      (order.cart || []).forEach((item: any) => {
        const key = item.id || item.name;
        const current = itemsMap.get(key) || {
          name: item.name,
          quantity: 0,
          amount: 0,
        };
        current.quantity += item.quantity || 0;
        current.amount += (item.sellingPrice || 0) * (item.quantity || 0);
        itemsMap.set(key, current);
      });
    });
    return Array.from(itemsMap.values());
  }, [orders]);

  const totalSales = items.reduce((sum, item) => sum + item.amount, 0);

  const itemData = React.useMemo(
    () => [
      {
        label: "Cantidad vendida",
        data: items.map((item) => ({
          primary: item.name,
          secondary: item.quantity,
        })),
      },
    ],
    [items],
  );

  const salesByDateChart = React.useMemo(() => {
    const dateOrder: string[] = [];
    const seenDates = new Set<string>();
    const productNames = new Map<string, string>();
    const amounts = new Map<string, Map<string, number>>();
    orders.forEach((order) => {
      const date = getDateKey(order);
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dateOrder.push(date);
      }
      if (!amounts.has(date)) amounts.set(date, new Map());
      const dayAmounts = amounts.get(date)!;
      (order.cart || []).forEach((item: any) => {
        const key = item.id || item.name;
        productNames.set(key, item.name);
        const amount = (item.sellingPrice || 0) * (item.quantity || 0);
        dayAmounts.set(key, (dayAmounts.get(key) || 0) + amount);
      });
    });
    return Array.from(productNames.entries()).map(([key, name]) => ({
      label: name,
      data: dateOrder.map((date) => ({
        primary: date,
        secondary: amounts.get(date)?.get(key) || 0,
      })),
    }));
  }, [orders]);

  const primaryAxis = React.useMemo<AxisOptions<SalesDatum>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    [],
  );
  const secondaryAxes = React.useMemo<AxisOptions<SalesDatum>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "bar",
      },
    ],
    [],
  );
  const stackedSecondaryAxes = React.useMemo<AxisOptions<SalesDatum>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "bar",
        stacked: true,
      },
    ],
    [],
  );
  const getSeriesStyle = React.useMemo(
    () => (series: { index: number }) => ({
      color: seriesColors[series.index % seriesColors.length],
    }),
    [],
  );

  const columns: TableColumn<{
    name: string;
    quantity: number;
    amount: number;
  }>[] = [
    {
      name: "Producto",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cantidad vendida",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Monto",
      selector: (row) => row.amount,
      format: (row) => `$${row.amount.toFixed(2)}`,
      sortable: true,
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        background: colors.surfaceHover,
        borderBottomColor: colors.border,
      },
    },
    headCells: {
      style: {
        color: colors.text,
        fontWeight: 700,
        fontSize: 14,
      },
    },
    rows: {
      style: {
        minHeight: 64,
        color: colors.text,
      },
    },
    pagination: {
      style: {
        backgroundColor: colors.backgroundColor,
        borderTopColor: colors.border,
      },
    },
  };

  return (
    <>
      <Card style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Text size={typography.h1} weight={700}>
          Ventas
        </Text>
        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <Text color={colors.textSecondary}>No hay ventas todavía.</Text>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={items}
              pagination
              customStyles={customStyles}
              highlightOnHover
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: spacing.sm,
              }}
            >
              <Text weight={700}>Total de ventas:</Text>
              <Text weight={700}>${totalSales.toFixed(2)}</Text>
            </div>
          </>
        )}
      </Card>
      <Card
        style={{
          marginTop: spacing.lg,
          gap: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text size={typography.h1} weight={700}>
          Cantidad vendida por producto
        </Text>
        <div style={{ height: 300, width: "100%" }}>
          {items.length > 0 && (
            <Chart options={{ data: itemData, primaryAxis, secondaryAxes }} />
          )}
        </div>

        <Text size={typography.h1} weight={700}>
          Ventas totales por fecha
        </Text>
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md }}>
          {salesByDateChart.map((series, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: spacing.xs }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: seriesColors[index % seriesColors.length],
                  display: "inline-block",
                }}
              />
              <Text size={typography.small}>{series.label}</Text>
            </div>
          ))}
        </div>
        <div style={{ height: 300, width: "100%" }}>
          {salesByDateChart.length > 0 &&
            salesByDateChart[0].data.length > 0 && (
              <Chart
                options={{
                  data: salesByDateChart,
                  primaryAxis,
                  secondaryAxes: stackedSecondaryAxes,
                  getSeriesStyle,
                }}
              />
            )}
        </div>
      </Card>
    </>
  );
};

export default Sales;
