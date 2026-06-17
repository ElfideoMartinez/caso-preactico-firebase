import Card from "./Card";
import Button from "../buttons/Button";
import Text from "../typography/Text";
import { colors } from "../../constants/colors";
import { addToCart } from "../../services/firebase/users/index";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

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
  const onSale = salePrice !== undefined && salePrice < price;
  const [isLoading, setIsLoading] = useState(false);

  const outOfStock = stock <= 0;

  return (
    <Card style={{ width: "max-content", minWidth: 300, margin: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "max-content",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
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
              SALE
            </div>
          )}

          {outOfStock && (
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: colors.secondary,
                color: colors.white,
                padding: "6px 12px",
                borderRadius: 20,
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              OUT OF STOCK
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Text size={20} weight={700}>
            {name}
          </Text>

          <Text color={colors.textSecondary}>{description}</Text>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {onSale ? (
            <>
              <Text size={24} weight={700} color={colors.success}>
                ${salePrice}
              </Text>

              <Text color={colors.textDisabled}>
                <s>${price}</s>
              </Text>
            </>
          ) : (
            <Text size={24} weight={700}>
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
                padding: 12,
                borderRadius: 12,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Currently unavailable
            </div>
          ) : (
            onSale && (
              <div
                style={{
                  background: colors.successLight,
                  color: colors.success,
                  padding: 12,
                  borderRadius: 12,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Limited-time discount
              </div>
            )
          )}
        </div>

        <Button
          disabled={!user || outOfStock || isLoading}
          onClick={async () => {
            //add cart object to user in firebase
            try {
              setIsLoading(true);
              await addToCart(user?.uid || "", id, name, salePrice || price);
              alert("Product added to cart!");
            } catch (error) {
              console.error("Error adding product to cart:", error);
              alert(
                error instanceof Error
                  ? error.message
                  : "Error adding product to cart",
              );
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
