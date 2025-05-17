import {useUser} from '@clerk/clerk-react';
import { FinancialRecordForm } from './financial-record-form';
import { FinancialRecordList } from './financial-record-list';
import "./financial-record.css";
import { useFinancialRecords } from '../../contexts/financial-record-context';
import {useMemo} from 'react';
export const Dashboard = () => {
    const {user, isLoaded} = useUser();
    const { records, loading, error } = useFinancialRecords();
    
    if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  if (loading) {
    return <div>Loading financial records...</div>;
  }

  if (error) {
    return (
      <div>
         <p>
        Oops, there was an error fetching your financial records. This might
        happen if the server is still waking up.
      </p>
      <p>Please try refreshing the page after a few seconds.</p>      </div>
    );
  }

    
    const totalMonthly = useMemo(() => {
            let totalAmount = 0;
            records.forEach((record) => {
                totalAmount += record.amount;
            })

            return totalAmount;
    }, [records]);

    return (
      <div className="dashboard-container">
    <h1> Welcome {user?.firstName}! Here are your Finances</h1>
    <FinancialRecordForm />
    <div>Total Monthly: ${totalMonthly}</div>

    {records.length === 0 ? (
      <p>No records found. Please add some financial records.</p>
    ) : (
      <FinancialRecordList />
    )}
  </div>
);
}