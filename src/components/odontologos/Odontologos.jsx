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
    nombre: "",
    apellido: "",
    matricula: "",
  });

  const getAllDentist = async () => {
    try {
      const request = await axios.get("http://localhost:8080/odontologos");
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
    const { nombre, apellido, matricula } = form;
    const formToPost = {
      apellido,
      nombre,
      matricula,
    };
    try {
      const request = await axios.post(
        "http://localhost:8080/odontologos",
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
    getAllDentist();
  }, []);

  const modalCreate = (
    <div className={styles.modal}>
      <h4>Crear Odontólogo</h4>
      <TextField
        className={styles.inputMaterial}
        name="nombre"
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="apellido"
        label="Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="matricula"
        label="Matricula"
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
        `http://localhost:8080/odontologos/${id}`
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
    <div className="container__Table">
      <h1>Odontólogos</h1>
      <div>
        <button className="button" onClick={() => toogleModalAgree()}>
          Crear odontólogo
        </button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Matricula</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ apellido, nombre, matricula, id }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{nombre}</TableCell>
                <TableCell>{apellido}</TableCell>
                <TableCell>{matricula}</TableCell>
                <TableCell>
                  <Delete className="icon" onClick={() => deletePatient(id)} />
                </TableCell>
              </TableRow>
            ))}
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
