import Card from "./Card";
import Button from "../buttons/Button";
import Text from "../typography/Text";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "../../contexts/CartContext";
import { useImageCache } from "../../contexts/ImageCacheContext";

type ProductCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
};

function ProductCard({
  id,
  imageUrl,
  name,
  description,
  price,
  salePrice,
  stock,
}: ProductCardProps) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { getCachedUrl } = useImageCache();
  const onSale = salePrice !== undefined && salePrice < price;
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [cuantityControl, setCuantityControl] = useState(1);

  const outOfStock = stock <= 0;
  const handleQuantityChange = (delta: number) => {
    setCuantityControl((prev) => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > stock) {
        Swal.fire({
          icon: "warning",
          title: "Limite de stock alcanzado",
          text: `Solo ${stock} artículos disponibles en stock.`,
        });
        return stock;
      }
      return newQuantity;
    });
  };
  useEffect(() => {
    if (!imageUrl) {
      return;
    }
    let active = true;
    getCachedUrl(imageUrl)
      .then((url) => {
        if (active) {
          setImageSrc(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      active = false;
    };
  }, [imageUrl]);

  return (
    <Card style={{ minWidth: 300 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageSrc}
            alt={name}
            style={{
              width: "100%",
              height: 220,
              objectFit: "fill",
              borderRadius: 12,
            }}
          />

          {onSale && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: colors.danger,
                color: colors.white,
                padding: "6px 12px",
                borderRadius: 20,
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              OFERTA
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacing.sm,
          }}
        >
          <Text size={typography.h3} weight={700}>
            {name}
          </Text>

          <Text color={colors.textSecondary}>{description}</Text>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
          }}
        >
          {onSale ? (
            <>
              <Text size={typography.h2} weight={700} color={colors.success}>
                ${salePrice}
              </Text>

              <Text color={colors.textDisabled}>
                <s>${price}</s>
              </Text>
            </>
          ) : (
            <Text size={typography.h2} weight={700}>
              ${price}
            </Text>
          )}
        </div>
        <div>
          {outOfStock ? (
            <div
              style={{
                background: colors.dangerLight,
                color: colors.danger,
                padding: spacing.sm,
                borderRadius: 12,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              No hay stock disponible
            </div>
          ) : (
            onSale && (
              <div
                style={{
                  background: colors.successLight,
                  color: colors.success,
                  padding: spacing.sm,
                  borderRadius: 12,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Descuento por tiempo limitado
              </div>
            )
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: spacing.sm,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => handleQuantityChange(-1)}>-</Button>
          <Text>{cuantityControl}</Text>
          <Button onClick={() => handleQuantityChange(1)}>+</Button>
        </div>
        <Button
          disabled={!user || outOfStock || isLoading}
          onClick={async () => {
            try {
              setIsLoading(true);
              await addItem(id, name, salePrice || price, cuantityControl);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.error("Error adding product to cart:", error);
              Swal.fire({
                icon: "error",
                title: "No se pudo agregar al carrito",
                text: "Inténtalo de nuevo más tarde.",
              });
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
