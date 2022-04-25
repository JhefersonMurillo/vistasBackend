import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/styles.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function Pacientes() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [isOpenAgree, setIsOpenAgree] = useState(false);
  const [form, setForm] = useState({
    apellido: "",
    nombre: "",
    email: "",
    dni: "",
    fechaIngreso: "",
    calle: "",
    numero: "",
    localidad: "",
    provincia: "",
  });

  const getAllPatients = async () => {
    try {
      const request = await axios.get("http://localhost:8080/pacientes");
      const response = request.data;
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
    console.log(form);
  };
  const createPatient = async () => {
    const {
      apellido,
      nombre,
      email,
      dni,
      fechaIngreso,
      calle,
      numero,
      localidad,
      provincia,
    } = form;
    const formToPost = {
      apellido,
      nombre,
      email,
      dni: Number(dni),
      fechaIngreso,
      domicilio: {
        calle,
        numero: Number(numero),
        localidad,
        provincia,
      },
    };
    try {
      const request = await axios.post(
        "http://localhost:8080/pacientes",
        formToPost
      );
      const response = request.data;
      toogleModalAgree();
      setData((prevState) => [...prevState, response]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const modalCreate = (
    <div className={styles.modal}>
      <h4>Crear Paciente</h4>
      <TextField
        className={styles.inputMaterial}
        name="apellido"
        label="Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="nombre"
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="email"
        label="email"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="dni"
        label="DNI"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="fechaIngreso"
        label="Fecha Ingreso"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="calle"
        label="Calle"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="numero"
        label="Numero Calle"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="localidad"
        label="Localidad"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="provincia"
        label="Provincia"
        onChange={handleChange}
      />
      <br />
      <div className="div">
        <Button onClick={() => createPatient()} color="primary">
          Insertar
        </Button>
        <Button onClick={() => toogleModalAgree()}>Cancelar</Button>
      </div>
    </div>
  );

  const deletePatient = async (id) => {
    try {
      const request = await axios.delete(
        `http://localhost:8080/pacientes/${id}`
      );
      if (request && request.data) {
        const pacientes = data.filter((paciente) => paciente.id !== id);
        setData(pacientes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toogleModalAgree = () => {
    setIsOpenAgree(!isOpenAgree);
  };

  return (
    <div>
      <h1>Pacientes</h1>
      <div>
        <button className="button" onClick={() => toogleModalAgree()}>
          Crear paciente
        </button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Fecha Ingreso</TableCell>
              <TableCell>Calle</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Localidad</TableCell>
              <TableCell>Provincia</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              ({
                id,
                apellido,
                nombre,
                email,
                dni,
                fechaIngreso,
                domicilio,
              }) => (
                <TableRow key={id}>
                  <TableCell>{apellido}</TableCell>
                  <TableCell>{nombre}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{dni}</TableCell>
                  <TableCell>{fechaIngreso}</TableCell>
                  <TableCell>{domicilio?.calle}</TableCell>
                  <TableCell>{domicilio?.numero}</TableCell>
                  <TableCell>{domicilio?.localidad}</TableCell>
                  <TableCell>{domicilio?.provincia}</TableCell>
                  <TableCell>
                    <Delete
                      className="icon"
                      onClick={() => deletePatient(id)}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isOpenAgree} onClose={toogleModalAgree}>
        {modalCreate}
      </Modal>
    </div>
  );
}

export default Pacientes;
