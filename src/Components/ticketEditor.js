import React, { useEffect, useRef } from "react";

const TicketEditor = ({ color, character, special, owner, onImageReady, imgRef }) => {
  const canvasRef = useRef(null);
  let imagePath;

  if (special === "GECENIN_YILDIZI") {
    imagePath = require(`../Tickets/special/GECENIN_YILDIZI.png`);
  } else if (special === "SKYDAYS") {
    imagePath = require(`../Tickets/SKYDAYS/SKYDAYS.png`);
  }else if (special == "ARTLAB"){
    imagePath = require(`../Tickets/ARTLAB/ARTLAB.png`)
  } else if (special === "YILDIZJAM") {
    imagePath = require(`../Tickets/YILDIZJAM/YILDIZJAM.png`);
  } else {
    imagePath = require(`../Tickets/${color}/${color}_${character}.png`);
  }

  useEffect(() => {
    const loadFontAndRender = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      try {
        await Promise.all([
          document.fonts.load("80px 'Bebas Neue'"),
          document.fonts.load("90px 'Antonio'"),
          document.fonts.load("80px 'Prolamina'"),
        ]);

        const img = new Image();
        img.src = imagePath;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });


        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);


        let textX = canvas.width * 0.13;
        let textY = canvas.height * 0.6;
        let textColor = "white";
        let fontSize = "80px";
        let rotation = 0;
        ctx.font = `${fontSize} 'Bebas Neue'`;

        if (special === "GECENIN_YILDIZI") {
          textX = canvas.width * 0.865;
          textY = canvas.height * 0.52;
          textColor = "darkgreen";
          fontSize = "200px";
          ctx.font = `${fontSize} 'Bebas Neue'`;
        }

        if (special === "ARTLAB") {
          textX = canvas.width * 0.1;
          textY = canvas.height * 0.1;
          textColor = "white";
          fontSize = "280px";
          ctx.font = `${fontSize} 'Bebas Neue'`;
        }

        if (special === "SKYDAYS") {
          textX = canvas.width * 0.7;
          textY = canvas.height * 0.5;
          textColor = "white";
          fontSize = "75px";
          rotation = -Math.PI / 2;
          ctx.font = `${fontSize} 'Bebas Neue'`;
        }

        if (special === "YILDIZJAM") {
          textX = canvas.width * 0.35;
          textY = canvas.height * 0.90;
          textColor = "#c776ea";
          fontSize = "140px";
          ctx.font = `${fontSize} 'Prolamina'`; // Prolamina kontrolü
        }

        ctx.fillStyle = textColor;
        if (special === "GECENIN_YILDIZI") {
          ctx.textAlign = "right";
        } else if (special === "SKYDAYS") {
          ctx.textAlign = "center";
        } else {
          ctx.textAlign = "left";
        }

        const textToDraw = `${owner.firstName} ${owner.lastName}`.toUpperCase();

        ctx.save(); 
        if (rotation !== 0) {
          ctx.translate(textX, textY);
          ctx.rotate(rotation);
          ctx.fillText(textToDraw, 0, 0);
        } else {
          ctx.fillText(textToDraw, textX, textY);
        }
        ctx.restore(); 

        const finalImage = canvas.toDataURL("image/png");
        onImageReady(finalImage);
      } catch (error) {
        console.error("Yükleme hatası:", error);
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
