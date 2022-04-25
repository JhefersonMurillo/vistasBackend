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
    paciente: "",
    odontologo: "",
    fecha: "",
  });

  const getAllAppointment = async () => {
    try {
      const request = await axios.get("http://localhost:8080/turnos");
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
    const { paciente, odontologo, fecha } = form;
    const formToPost = {
      paciente: {
        id: paciente,
      },
      odontologo: {
        id: odontologo,
      },
      fecha: fecha,
    };
    try {
      const request = await axios.post(
        "http://localhost:8080/turnos",
        formToPost
      );
      const response = request.data;
      toogleModalAgree();
      getAllAppointment();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAppointment();
  }, []);

  const modalCreate = (
    <div className={styles.modal}>
      <h4>Crear Paciente</h4>
      <TextField
        className={styles.inputMaterial}
        name="paciente"
        label="Id Paciente"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="odontologo"
        label="Id Odontologo"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        name="fecha"
        label="Fecha"
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

  const toogleModalAgree = () => {
    setIsOpenAgree(!isOpenAgree);
  };

  return (
    <div>
      <h1>Turnos</h1>
      <div>
        <button className="button" onClick={() => toogleModalAgree()}>
          Crear Turno
        </button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell># Turno</TableCell>
              <TableCell>Odontologo</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Email Paciente</TableCell>
              <TableCell>Fecha Ingreso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, paciente, odontologo, fecha }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{`${odontologo?.nombre} ${odontologo?.apellido}`}</TableCell>
                <TableCell>{`${paciente?.nombre} ${paciente?.apellido}`}</TableCell>
                <TableCell>{paciente?.email}</TableCell>
                <TableCell>{fecha}</TableCell>
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
