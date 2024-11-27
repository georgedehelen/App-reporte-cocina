import React, { createContext, useState, useEffect } from 'react'; // Asegúrate de importar useEffect

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]); // Productos del inventario
    const [menu, setMenu] = useState([]); // Menú diario
    const [reportData, setReportData] = useState(null); // Estado global para el reporte

    // Este useEffect revisará cambios en el estado reportData
    useEffect(() => {
        console.log("Estado actual de reportData:", reportData);
    }, [reportData]);

    return (
        <AppContext.Provider value={{ inventory, setInventory, menu, setMenu, reportData, setReportData }}>
            {children}
        </AppContext.Provider>
    );
};
