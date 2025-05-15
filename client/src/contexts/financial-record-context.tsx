// import { createContext, useContext, useState } from "react";

// interface FinancialRecord {
//   id?: string;
//   userId: string;
//   date: Date;
//   description: string;
//   amount: number;
//   category: string;
//   paymentMethod: string;
// }
// interface FinancialRecordsContextType {
//   records: FinancialRecord[];
//   addRecord: (record: FinancialRecord) => void;
//   //   updateRecord: (id: string, newRecord: FinancialRecord) => void;
//   //   deleteRecord: (id: string) => void;
// }

// export const FinancialRecordContext = createContext<
//   FinancialRecordsContextType | undefined
// >(undefined);

// export const FinancialRecordsProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [records, setRecords] = useState<FinancialRecord[]>([]);

//   const addRecord = async (record: FinancialRecord) => {
//     const response = await fetch("http://localhost:3001/financial-records", {
//       method: "POST",
//       body: JSON.stringify(record),
//       headers: {
//         "Content-type": "application/json",
//       },
//     });

//     try {
//       if (response.ok) {
//         const newRecord = await response.json();
//         setRecords((prev) => [...prev, newRecord]);
//       }
//     } catch (err) {}
//   };

//   return (
//     <FinancialRecordContext.Provider value={{ records, addRecord }}>
//       {" "}
//       {children}
//     </FinancialRecordContext.Provider>
//   );
// };

// export const useFinancialRecords = () => {
//   const context = useContext<FinancialRecordsContextType | undefined>(
//     FinancialRecordContext
//   );

//   if (!context) {
//     throw new Error(
//       "useFinancialRecords must be used within FinancialRecordsProvider"
//     );
//   }

//   return context;
// };

// import { useUser } from "@clerk/clerk-react";
// import { createContext, useContext, useEffect, useState } from "react";

// export interface FinancialRecord {
//   _id?: string;
//   userId: string;
//   date: Date;
//   description: string;
//   amount: number;
//   category: string;
//   paymentMethod: string;
// }

// interface FinancialRecordsContextType {
//   records: FinancialRecord[];
//   addRecord: (record: FinancialRecord) => void;
//   updateRecord?: (id: string, newRecord: FinancialRecord) => void;
//   deleteRecord?: (id: string) => void;
// }

// // 1. Create the context
// const FinancialRecordContext = createContext<
//   FinancialRecordsContextType | undefined
// >(undefined);

// // 2. Create the provider as a named function
// function FinancialRecordsProvider({ children }: { children: React.ReactNode }) {
//   const [records, setRecords] = useState<FinancialRecord[]>([]);

//   const { user } = useUser();
//   const fetchRecords = async () => {
//     if (!user) return;
//     const response = await fetch(
//       `http://localhost:3001/financial-records/getAllByUserID/${user?.id ?? ""}`
//     );

//     if (response.ok) {
//       const records = await response.json();
//       console.log(records);
//       setRecords(records);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, [user]);

//   const addRecord = async (record: FinancialRecord) => {
//     try {
//       const response = await fetch("http://localhost:3001/financial-records", {
//         method: "POST",
//         body: JSON.stringify(record),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const newRecord = await response.json();
//         setRecords((prev) => [...prev, newRecord]);
//       } else {
//         console.error(
//           "Failed to add record. Server responded with:",
//           response.status
//         );
//       }
//     } catch (err) {
//       console.error("Error adding record:", err);
//     }
//   };
//   const updateRecord = async (id: string, newRecord: FinancialRecord) => {
//     // if (!user) return;
//     try {
//       const response = await fetch(
//         `http://localhost:3001/financial-records/${id}`,
//         {
//           method: "PUT",
//           body: JSON.stringify(newRecord),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const newRecord = await response.json();
//         setRecords((prev) =>
//           prev.map((record) => {
//             if (record._id === id) {
//               return newRecord;
//             } else {
//               return record;
//             }
//           })
//         );
//       } else {
//         console.error(
//           "Failed to add record. Server responded with:",
//           response.status
//         );
//       }
//     } catch (err) {
//       console.error("Error adding record:", err);
//     }
//   };

//   const deleteRecord = async (id: string) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/financial-records/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         const deletedRecord = await response.json();
//         setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
//       } else {
//         console.error(
//           "Failed to delete record. Server responded with:",
//           response.status
//         );
//       }
//     } catch (err) {
//       console.error("Error deleting record:", err);
//     }
//   };
//   return (
//     <FinancialRecordContext.Provider
//       value={{ records, addRecord, updateRecord, deleteRecord }}
//     >
//       {children}
//     </FinancialRecordContext.Provider>
//   );
// };

// // 3. Create the custom hook
// function useFinancialRecords() {
//   const context = useContext(FinancialRecordContext);

//   if (!context) {
//     throw new Error(
//       "useFinancialRecords must be used within FinancialRecordsProvider"
//     );
//   }

//   return context;
// }

// // 4. Export everything correctly
// export {
//   FinancialRecordsProvider,
//   useFinancialRecords,
//   FinancialRecordContext,
// };

import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord?: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord?: (id: string) => void;
}

// 1. Create the context
const FinancialRecordContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

// 2. Create the provider
function FinancialRecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchRecords = async () => {
      if (!isLoaded || !user) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/financial-records/getAllByUserID/${user.id}`
        );

        if (!response.ok) {
          console.error("Failed to fetch records:", response.status);
          return;
        }

        const data = await response.json();
        console.log("Fetched records:", data);
        setRecords(data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    fetchRecords();
  }, [isLoaded, user]);

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/financial-records`, {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      } else {
        console.error("Failed to add record. Status:", response.status);
      }
    } catch (err) {
      console.error("Error adding record:", err);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/financial-records/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newRecord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record._id === id ? updated : record))
        );
      } else {
        console.error("Failed to update record. Status:", response.status);
      }
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const deleted = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deleted._id)
        );
      } else {
        console.error("Failed to delete record. Status:", response.status);
      }
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
}

// 3. Create the custom hook
function useFinancialRecords() {
  const context = useContext(FinancialRecordContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within FinancialRecordsProvider"
    );
  }

  return context;
}

// 4. Export everything
export {
  FinancialRecordsProvider,
  useFinancialRecords,
  FinancialRecordContext,
};
