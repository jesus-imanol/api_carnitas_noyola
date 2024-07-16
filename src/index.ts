import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from "cors";
// Importar rutas de módulos
//import employeeRoutes from './employee/routes/employeeRoutes';
import productsRoutes from './products/routes/productsRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';
import userRoute from './user/routes/userRoute';
import ordersRoutes from './orders/routes/ordersRoutes';
import rolesRoutes from './role/routes/roleRoutes';
import reservationRoutes from './reservation/routes/reservationRoutes';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) | 3000;

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// Rutas de los módulos
//app.use('/api/employee', employeeRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/users', userRoute);
app.use("/api/orders", ordersRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/reservations", reservationRoutes);
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://52.87.43.51:${port}`);
  //console.log(`Servidor corriendo en http://52.87.43.51:${port}`);
});
