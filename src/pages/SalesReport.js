import React, { useContext, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesReport = () => {
    const { menu, setReportData } = useContext(AppContext); // Asegurarse de incluir setReportData
    const navigate = useNavigate(); // Definir navigate aquí
    const [report, setReport] = useState(
        menu.map((item) => ({
            ...item,
            sold: 0, // Inicialmente vendidos es 0
            remaining: '' // Inicialmente vacío
        }))
    );

    const [notes, setNotes] = useState(''); // Estado para manejar las notas
    const [notesError, setNotesError] = useState(''); // Estado para manejar errores de las notas

    // Función para manejar cambios en el campo de notas
    const handleNotesChange = (e) => {
        const input = e.target.value;
        if (input.length > 500) {
            setNotesError('Las notas no pueden superar los 500 caracteres.');
        } else {
            setNotesError('');
            setNotes(input);
        }
    };

    // Función para marcar todos los productos como vendidos
    const markAllSold = () => {
        const updatedReport = report.map((item) => ({
            ...item,
            sold: item.quantity,
            remaining: 0
        }));
        setReport(updatedReport);
        alert('¡Felicitaciones! Vendiste todos tus productos.');
    };

    // Función para actualizar la cantidad restante y los vendidos
    const updateRemaining = (index, change) => {
        const updatedReport = [...report];
        const currentItem = updatedReport[index];
        const newRemaining = currentItem.remaining === '' ? 0 + change : currentItem.remaining + change;

        if (newRemaining < 0) {
            alert('No puedes tener menos de 0 productos restantes.');
            return;
        }

        if (newRemaining > currentItem.quantity) {
            alert('No puedes exceder la cantidad inicial asignada.');
            return;
        }

        currentItem.remaining = newRemaining;
        currentItem.sold = currentItem.quantity - newRemaining;
        setReport(updatedReport);
    };

    // Función para generar el reporte final
    const generateReport = () => {
        if (report.some((item) => item.remaining === '')) {
            alert('Por favor completa todos los campos antes de generar el reporte.');
            return;
        }

        // Validar notas
        if (notesError) {
            alert('Por favor corrige el error en las notas antes de generar el reporte.');
            return;
        }

        // Preparar los datos del reporte
        const finalReport = {
            report: report.map((item) => ({
                name: item.name,
                category: item.category,
                price: item.price,
                initial: item.quantity,
                sold: item.sold,
                remaining: item.remaining,
            })),
            notes: notes || 'No se añadieron notas adicionales.',
        };

        console.log("Datos generados en Pantalla 3:", finalReport);

        // Guardar los datos en el contexto
        setReportData(finalReport);

        // Redirigir a la Pantalla 4 después de guardar los datos
        setTimeout(() => navigate('/report'), 100); // Redirigir tras asegurarte de que los datos se guardaron
    };

    // Calcular totales para el recuadro informativo
    const totalPlatos = report
        .filter((item) => item.category === 'Plato')
        .reduce((acc, item) => acc + item.quantity, 0);

    const totalPanaderia = report
        .filter((item) => item.category === 'Panadería')
        .reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-start align-items-start mb-4">
                <div
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '15px',
                        maxWidth: '300px',
                        backgroundColor: '#f9f9f9'
                    }}
                >
                    <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Platos:</strong> {totalPlatos}</p>
                    <p><strong>Panadería:</strong> {totalPanaderia}</p>
                </div>
            </div>

            <h1 className="text-center mb-4">Reporte Diario - Ventas</h1>

            <Table striped bordered hover responsive className="shadow">
                <thead className="table-dark">
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Salí con</th>
                        <th>Vendidos</th>
                        <th>Me quedaron</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map((item, index) => (
                        <tr
                            key={index}
                            className="align-middle"
                            style={{
                                backgroundColor: item.category === 'Panadería' ? '#fff4e6' : 'transparent',
                                border: item.category === 'Panadería' ? '2px solid #ffcc99' : 'none'
                            }}
                        >
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.sold}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.remaining === '' ? '' : item.remaining}
                                    onChange={(e) =>
                                        updateRemaining(index, parseInt(e.target.value || '0') - (item.remaining || 0))
                                    }
                                    placeholder=""
                                    className="form-control"
                                    min="0"
                                />
                            </td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => updateRemaining(index, -1)}
                                    >
                                        <FaMinus />
                                    </Button>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => updateRemaining(index, 1)}
                                    >
                                        <FaPlus />
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => updateRemaining(index, -item.remaining)}
                                    >
                                        <FaCheck />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Campo de notas */}
            <div className="mt-4">
                <h4>Notas Adicionales</h4>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Escribe aquí tus notas adicionales..."
                        value={notes}
                        onChange={handleNotesChange}
                    />
                    {notesError && <Form.Text className="text-danger">{notesError}</Form.Text>}
                </Form.Group>
            </div>

            {/* Botones */}
            <div className="text-center mt-4">
                <Button variant="success" className="me-3" onClick={markAllSold}>
                    Vendí Todo
                </Button>
                <Button variant="primary" onClick={generateReport}>
                    Generar Reporte
                </Button>
            </div>
        </Container>
    );
};

export default SalesReport;
