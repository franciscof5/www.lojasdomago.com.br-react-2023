import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const TestTable = () => {
  const [priceBTC, setPriceBTC] = useState(500000);
  const [priceSolana, setPriceSolana] = useState(700);
  const [data, setData] = useState([]);
  const sheetId = "1OKv19CtrtStBvF3wnyZpdVFFhkmi5p5xIdhMAM88AEg"; // Substitua pela sua ID de planilha
  const apiKey = "AIzaSyAkfqaa5Cy4qSIdQ4moJTRZZCcRKewFLlE"; // Substitua pela sua API Key do Google
  const range = "Loja!A3:C166"; // Ajuste o intervalo conforme necessário
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
  //     try {
  //       const response = await axios.get(url);
  //       setData(response.data.values || []);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);
  // Estado para o filtro global
  const [globalFilter, setGlobalFilter] = useState("");

  
  // Defina as colunas da tabela
  const columns = React.useMemo(
    () => [
      {
        Header: 'Item',
        accessor: 'item',
      },
      {
        Header: 'Preço',
        accessor: 'price',
      },
      {
        Header: 'Local',
        accessor: 'local',
      },
      {
        Header: 'Comprar',
        accessor: 'buy_button'
      },
    ],
    []
  );

  // Dados estáticos
  const staticData = React.useMemo(
    () => [
      { item: 'Prancha Surf 8 Shaper', price: 'R$ 1.150,00', local: 'Quarto Sil lembranças' },
      { item: 'Guitarra Vermelha Epiphone Special One C/Bag', price: 'R$ 1.000,00', local: 'sil-solto' },
    ],
    []
  );
  
  const convertPrice = (price) => {
    // Remove "R$" e os pontos de milhar
    const cleanedPrice = price
      .replace("R$", "") // Remove "R$"
      .replace(/\./g, "") // Remove o ponto separador de milhar
      .replace(",", "."); // Substitui a vírgula por ponto decimal

    // Converte para float e retorna com 2 casas decimais
    return parseFloat(cleanedPrice).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        const apiData = response.data.values || [];

        // Converte os dados da API para o formato esperado pela tabela
        const formattedData = apiData.map(item => ({
          item: item[0],  // Item
          price: item[1], // Preço
          local: parseFloat(convertPrice(item[1])/priceSolana).toFixed(2), // Local
          buy_button: '<Button variant="primary">Comprar</Button>'
        }));

        // Combina dados estáticos com os dados da API
        const combinedData = [...staticData, ...formattedData];
        console.log("combinedData:", combinedData)
        setData(formattedData); // Atualiza o estado com dados combinados
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    const fetchPriceBTC = async () => {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl';
      const API_cripto_btcbrl = "https://criptoya.com/api/binance/btc/brl/1";
      
      try {
        const response = await axios.get(API_cripto_btcbrl);
        setPriceBTC(response.data.ask); // Armazena o preço do Bitcoin em brl
      } catch (error) {
        console.error("Erro ao buscar o preço:", error);
      }
    };
    
    const fetchPriceSolana = async () => {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=brl';
      const API_cripto_solbrl = "https://criptoya.com/api/binance/sol/brl/1";
      
      try {
        const response = await axios.get(API_cripto_solbrl);
        setPriceSolana(response.data.ask); // Armazena o preço do Bitcoin em brl
      } catch (error) {
        console.error("Erro ao buscar o preço:", error);
      }
    };

    fetchPriceBTC();
    fetchPriceSolana();
    
    fetchData();
  }, [staticData, sheetId, range, apiKey]);

  // Use o hook useTable com useSortBy e useFilters
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter, // Função para setar o filtro
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      globalFilter, // Aplicar filtro global
    },
    useFilters, // Hook para filtros
    useSortBy // Hook para ordenação
  );

  // Função para filtrar globalmente
  const handleFilterChange = e => {
    const value = e.target.value;
    setGlobalFilter(value);
  };

  const handleKeyDown = (e) => {
    // Não prevenir o comportamento padrão, pois precisamos permitir o backspace
    const value = e.target.value;
    setGlobalFilter(value);
  };

  return (
    <>
      {/* Filtro Global */}
      <div>
        <input
          value={globalFilter || ''}
          onChange={handleFilterChange}
          onKeyDown={handleKeyDown} // Adiciona a captura do evento 'keydown'
          placeholder="Filtrar por qualquer coluna"
        />
        <span>
          BTC: R${ priceBTC } - Sol: R${ priceSolana }
        </span>
      </div>

      {/* Tabela */}
      <table {...getTableProps()} border="1">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Adicionando indicadores de ordenação */}
                  <span>
                    {sortBy.length > 0
                      ? column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows
            .filter(row => {
              // Quando o filtro estiver vazio, exibe todas as linhas
              if (!globalFilter) return true;

              // Filtra as linhas com base no filtro global
              return row.cells.some(cell =>
                cell.value && cell.value.toString().toLowerCase().includes(globalFilter.toLowerCase())
              );
            })
            .map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    // <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    <td {...cell.getCellProps()}>
                      {/* Renderiza HTML se necessário */}
                      {cell.column.id === 'buy_button' ? (
                        <span dangerouslySetInnerHTML={{ __html: cell.value }} />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TestTable;
