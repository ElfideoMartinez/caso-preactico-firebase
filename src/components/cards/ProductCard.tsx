import Card from "./Card";
import Button from "../buttons/Button";
import Text from "../typography/Text";
import { colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "../../contexts/CartContext";
import { getStorageRef } from "../../services/firebase/storage/storageService";
import { getDownloadURL } from "firebase/storage";

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
  const onSale = salePrice !== undefined && salePrice < price;
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const outOfStock = stock <= 0;

  useMemo(() => {
    const fetchImageUrl = async () => {
      try {
        console.log("Fetching image URL for:", imageUrl);
        const storageRef = getStorageRef(imageUrl);
        const url = await getDownloadURL(storageRef);
        setImageSrc(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };
    if (imageUrl) {
      fetchImageUrl();
    }
  }, [imageUrl]);

  return (
    <Card style={{ minWidth: 300, margin: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
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
              await addItem(id, name, salePrice || price);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added to cart",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.error("Error adding product to cart:", error);
              Swal.fire({
                icon: "error",
                title: "Failed to add product to cart",
                text: "Please try again later.",
              });
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
