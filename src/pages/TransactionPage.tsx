/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { fetchTransactions } from '../services/HistoricosService';
import Pagination from '../components/Pagination'; 
import { useSearchParams } from "react-router-dom";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const client = searchParams.get('client') ?? "1"; 

  const transactionsPerPage = 5; 
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions(client);
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <h3>Transacciones de Clientes</h3>
      <Table
        data={currentTransactions}
        columns={[
          { header: 'Fecha', accessor: 'Timestamp' },
          { header: 'Fondo', accessor: 'FundId' },
          { header: 'Monto', accessor: 'Amount' },
          { header: 'Tipo', accessor: 'Type' },
        ]}
      />
      <Pagination
        transactionsPerPage={transactionsPerPage}
        totalTransactions={transactions.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TransactionsPage;
