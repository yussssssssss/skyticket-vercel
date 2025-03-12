// TicketEditor.js

import React, { useEffect, useRef } from "react";

const TicketEditor = ({ color, character, special, owner, onImageReady, imgRef }) => {
  const canvasRef = useRef(null);
  let imagePath;

  if (special === "GECENIN_YILDIZI") {
    imagePath = require(`../Tickets/special/GECENIN_YILDIZI.png`);
  } else if (special === "SKYDAYS"){
    imagePath = require(`../Tickets/SKYDAYS/SKYDAYS.png`);
  } else {
    imagePath = require(`../Tickets/${color}/${color}_${character}.png`);
  }

  useEffect(() => {
    const loadFontAndRender = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imagePath;

      try {
        await Promise.all([
          document.fonts.load("80px 'Bebas Neue'"),
          document.fonts.load("90px 'Antonio'"),
        ]);

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Varsayılan isim pozisyonu ve rengi
          let textX = canvas.width * 0.13;
          let textY = canvas.height * 0.6;
          let textColor = "white";
          let fontSize = "80px";
          ctx.font = `${fontSize} 'Bebas Neue'`;

          // Eğer özel bilet türü ise, isim konumunu ve rengini değiştir
          if (special === "GECENIN_YILDIZI") {
            textX = canvas.width * 0.865; // Sağ üst köşe için x pozisyonu
            textY = canvas.height * 0.52; // Üst kısmı için y pozisyonu
            textColor = "darkgreen"; // Koyu yeşil renk
            fontSize = "200px"; // Büyük font boyutu
            ctx.font = `${fontSize} 'Bebas Neue'`;
          }

          if (special === "SKYDAYS") {
            textX = canvas.width * 0.425; // Sağ üst köşe için x pozisyonu
            textY = canvas.height * 0.88; // Üst kısmı için y pozisyonu
            textColor = "white"; // Koyu yeşil renk
            fontSize = "80px"; // Büyük font boyutu
            ctx.font = `${fontSize} 'Antonio'`;
          }

          
          ctx.fillStyle = textColor;

          // Normal biletler için sola hizalama, özel biletler için sağa hizalama
          ctx.textAlign = special === "GECENIN_YILDIZI" ? "right" : "left";

          ctx.fillText(
            `${owner.firstName} ${owner.lastName}`.toUpperCase(),
            textX,
            textY
          );

          const finalImage = canvas.toDataURL("image/png");
          onImageReady(finalImage);
        };
      } catch (error) {
        console.error("Font yüklenirken hata oluştu:", error);
      }
    };

    loadFontAndRender();
  }, [imagePath, owner, onImageReady, special]);

  return (
    <div className="ticket-container">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img ref={imgRef} src={imagePath} alt="Ticket" className="ticket-image" />
    </div>
  );
};

export default TicketEditor;
