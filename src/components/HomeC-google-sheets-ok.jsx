// https://docs.google.com/spreadsheets/d/
// 1OKv19CtrtStBvF3wnyZpdVFFhkmi5p5xIdhMAM88AEg
// /edit?gid=1426169313#gid=1426169313
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeC = () => {
  const [data, setData] = useState([]);
  const sheetId = "1OKv19CtrtStBvF3wnyZpdVFFhkmi5p5xIdhMAM88AEg"; // Substitua pela sua ID de planilha
  const apiKey = "AIzaSyAkfqaa5Cy4qSIdQ4moJTRZZCcRKewFLlE"; // Substitua pela sua API Key do Google
  const range = "Loja!A3:C166"; // Ajuste o intervalo conforme necessário

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        setData(response.data.values || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dados da Planilha</h2>
      <table border="1">
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeC;
