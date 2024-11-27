import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DailyReport = () => {
    const { reportData } = useContext(AppContext);

    if (!reportData) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                <h1>Reporte Completo del Día</h1>
                <p style={{ color: 'red' }}>
                    No hay datos disponibles para generar el reporte. Por favor, genera un reporte desde la pantalla de ventas.
                </p>
            </div>
        );
    }

    const { report, notes } = reportData;

    // Calcular Totales
    const totalSold = report.reduce((acc, item) => acc + item.sold * item.price, 0);
    const totalGain = totalSold * 0.4;
    const kitchenAmount = totalSold * 0.6;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            {/* Contenedor centrado */}
            <div style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="text-center mb-4">Reporte Completo del Día</h1>

                {/* Tabla de Productos */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4' }}>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Producto</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Categoría</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Precio</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Salí con</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Me quedaron</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Ganancia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.category}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>${item.price}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.initial}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.remaining}</td>
                                <td style={{ border: '1px solid #ccc', padding: '10px' }}>${(item.sold * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Resumen Financiero */}
                <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Resumen Financiero</h2>
                    <p><strong>Total Vendido:</strong> ${totalSold.toFixed(2)}</p>
                    <p><strong>Ganancia (40%):</strong> ${totalGain.toFixed(2)}</p>

                    {/* Monto a Entregar a la Cocina (resaltado) */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '18px',
                        color: '#2e7d32',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}>
                        <i className="fas fa-money-bill-alt" style={{ marginRight: '10px', fontSize: '24px' }}></i>
                        <span>Monto a Entregar a la Cocina (60%): ${kitchenAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Notas adicionales */}
                <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                    <h3>Notas Adicionales</h3>
                    <p>{notes || 'No se añadieron notas adicionales.'}</p>
                </div>
            </div>
        </div>
    );
};

export default DailyReport;
