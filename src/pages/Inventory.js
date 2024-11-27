import React, { useState, useContext, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
    const { inventory, setInventory } = useContext(AppContext); // Contexto global
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate(); // Hook para navegación

    // Lista predeterminada de productos
    useEffect(() => {
        const defaultProducts = [
            { name: 'arroz con camarón', category: 'Plato', price: 14 },
            { name: 'bandeja paisa', category: 'Plato', price: 15 },
            { name: 'bistec de res', category: 'Plato', price: 13 },
            { name: 'caldo de res', category: 'Plato', price: 13 },
            { name: 'carne asada', category: 'Plato', price: 15 },
            { name: 'chuleta frita', category: 'Plato', price: 14 },
            { name: 'fajitas de pollo', category: 'Plato', price: 13 },
            { name: 'filete a la mexicana', category: 'Plato', price: 13 },
            { name: 'flautas de pollo', category: 'Plato', price: 14 },
            { name: 'parrillada', category: 'Plato', price: 16 },
            { name: 'plato tres carnes', category: 'Plato', price: 16 },
            { name: 'pollo asado', category: 'Plato', price: 13 },
            { name: 'pollo frito', category: 'Plato', price: 13 },
            { name: 'pollo guisado', category: 'Plato', price: 15 },
            { name: 'puerco en salsa verde', category: 'Plato', price: 13 },
            { name: 'res en guajillo', category: 'Plato', price: 13 },
            { name: 'tacos', category: 'Plato', price: 14 },
            { name: 'tacos asada/lengua', category: 'Plato', price: 14 },
            { name: 'empanadas', category: 'Panadería', price: 2 },
            { name: 'tortas', category: 'Panadería', price: 7 },
            { name: 'tamales', category: 'Panadería', price: 4 },
            { name: 'Chicharrones', category: 'Panadería', price: 6 },
            { name: 'frutas', category: 'Panadería', price: 6 },
            

            
        
            // Agrega más productos aquí manualmente en el futuro
        ];

        if (inventory.length === 0) {
            setInventory(defaultProducts); // Solo carga los productos predeterminados si el inventario está vacío
        }
    }, [inventory, setInventory]);

    // Función para agregar productos nuevos al inventario
    const addProduct = () => {
        if (name && category && price > 0) {
            const updatedInventory = [...inventory, { name, category, price }];
            const sortedInventory = updatedInventory.sort((a, b) =>
                a.name.localeCompare(b.name)
            ); // Orden alfabético
            setInventory(sortedInventory);
            setName('');
            setCategory('');
            setPrice('');
        } else {
            alert('Por favor completa todos los campos correctamente.');
        }
    };

    const goToMenuDaily = () => {
        navigate('/menu'); // Redirige a Menú Diario
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Inventario de Productos</h1>
            <Form className="d-flex gap-3 mb-4">
                <Form.Control
                    type="text"
                    placeholder="Nombre del Producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Categoría</option>
                    <option value="Plato">Plato</option>
                    <option value="Panadería">Panadería</option>
                </Form.Select>
                <Form.Control
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Button onClick={addProduct}>Agregar</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-center mt-4">
                <Button variant="success" onClick={goToMenuDaily}>
                    Avanzar
                </Button>
            </div>
        </Container>
    );
};

export default Inventory;
