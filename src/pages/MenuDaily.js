import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuDaily = () => {
    const { inventory, menu, setMenu } = useContext(AppContext);
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);
    const [isEditingPrices, setIsEditingPrices] = useState(false); // Estado para editar precios

    // Inicializar productos de la categoría "Panadería"
    useEffect(() => {
        if (!initialized) {
            const bakeryProducts = inventory.filter((product) => product.category === 'Panadería');
            const existingBakery = menu.filter((item) => item.category === 'Panadería');

            if (existingBakery.length === 0) {
                const updatedMenu = [
                    ...menu,
                    ...bakeryProducts.map((product) => ({
                        ...product,
                        quantity: '', // Campos vacíos por defecto
                    })),
                ];
                setMenu(updatedMenu);
            }
            setInitialized(true);
        }
    }, [inventory, menu, setMenu, initialized]);

    // Añadir un producto al menú
    const addToMenu = (product) => {
        if (!menu.some((item) => item.name === product.name)) {
            const bakeryProducts = menu.filter((item) => item.category === 'Panadería');
            const nonBakeryProducts = menu.filter((item) => item.category !== 'Panadería');

            const updatedMenu = [
                ...nonBakeryProducts,
                { ...product, quantity: '' }, // Campos vacíos por defecto
                ...bakeryProducts,
            ];
            setMenu(updatedMenu);
        }
    };

    // Actualizar la cantidad
    const updateQuantity = (productName, value) => {
        const updatedMenu = menu.map((item) =>
            item.name === productName
                ? { ...item, quantity: value.trim() === '' ? '' : Math.max(0, parseInt(value) || '') } // Campos vacíos o números positivos
                : item
        );
        setMenu(updatedMenu);
    };

    // Actualizar el precio
    const updatePrice = (productName, value) => {
        const updatedMenu = menu.map((item) =>
            item.name === productName
                ? { ...item, price: value.trim() === '' ? '' : Math.max(0, parseFloat(value) || '') }
                : item
        );
        setMenu(updatedMenu);
    };

    // Ordenar productos en la sección de seleccionados
    const sortMenu = (menu) => {
        const bakeryOrder = ['empanadas', 'tortas', 'tamales', 'chicharrones', 'frutas'];
        const bakeryProducts = menu
            .filter((item) => item.category === 'Panadería')
            .sort((a, b) => bakeryOrder.indexOf(a.name.toLowerCase()) - bakeryOrder.indexOf(b.name.toLowerCase()));

        const otherProducts = menu.filter((item) => item.category !== 'Panadería');
<div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '18px',
                        color: '#2e7d32',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}></div>
        return [...otherProducts, ...bakeryProducts];
    };
    

    // Navegar al reporte de ventas
    const goToSalesReport = () => {
        navigate('/sales');
    };

    // Alternar estado de edición de precios
    const togglePriceEditing = () => {
        setIsEditingPrices(!isEditingPrices);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Productos del Inventario</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <Button variant="primary" onClick={() => addToMenu(product)}>
                                    Añadir al Menú
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2 className="text-center mb-4">Productos Seleccionados</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {sortMenu(menu).map((item) => (
                        <tr
                            key={item.name}
                            style={{
                                backgroundColor: item.category === 'Panadería' ? '#f8f9fa' : 'transparent',
                            }}
                        >
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>
                                {isEditingPrices ? (
                                    <Form.Control
                                        type="number"
                                        value={item.price === '' ? '' : item.price}
                                        onChange={(e) => updatePrice(item.name, e.target.value)}
                                        min="0"
                                    />
                                ) : (
                                    `$${item.price}`
                                )}
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={item.quantity === '' ? '' : item.quantity}
                                    onChange={(e) => updateQuantity(item.name, e.target.value)}
                                    placeholder=""
                                    min="0"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="text-center mt-4">
                <Button variant="warning" size="lg" className="me-3" onClick={togglePriceEditing}>
                    {isEditingPrices ? 'Guardar Precios' : 'Modificar Precios'}
                </Button>
                <Button variant="success" size="lg" onClick={goToSalesReport}>
                    A Vender
                </Button>
            </div>
        </Container>
    );
};

export default MenuDaily;
