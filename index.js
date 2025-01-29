import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
import { Button, Modal } from "react-bootstrap";
import { Stepper, Step } from "@mui/material";

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch } = useForm();
  const [table1Data, setTable1Data] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [colorPicker, setColorPicker] = useState({ show: false, index: null });
  const [mappingData, setMappingData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmitStep1 = (data) => nextStep();
  const onSubmitStep2 = () => nextStep();
  const onSubmitStep3 = () => nextStep();
  const onSubmitStep4 = () => nextStep();
  const onSubmitStep5 = (data) => console.log("Final Data:", data);

  return (
    <div className="container mt-5">
      <h2>Onboarding</h2>
      <Stepper activeStep={step} alternativeLabel>
        {["Account", "Import Data", "Faculties", "Mapping", "Final Setup"].map((label, index) => (
          <Step key={index}>{label}</Step>
        ))}
      </Stepper>

      {step === 0 && (
        <form onSubmit={handleSubmit(onSubmitStep1)}>
          <label>Account Name:</label>
          <input {...register("accountName", { required: true })} className="form-control" />
          <label>Contact Name:</label>
          <input {...register("contactName", { required: true })} className="form-control" />
          <label>Phone Number:</label>
          <input {...register("phone", { required: true })} className="form-control" type="tel" />
          <Button type="submit">Next</Button>
        </form>
      )}

      {step === 1 && (
        <div>
          <h4>Import Data (Table 1)</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {table1Data.map((row, index) => (
                <tr key={index}>
                  <td>{row.code}</td>
                  <td>{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={onSubmitStep2}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Create Faculties</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.map((faculty, index) => (
                <tr key={index}>
                  <td>{faculty.name}</td>
                  <td>
                    <div
                      style={{ background: faculty.color, width: 50, height: 20 }}
                      onClick={() => setColorPicker({ show: true, index })}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {colorPicker.show && (
            <SketchPicker
              color={facultyData[colorPicker.index]?.color}
              onChange={(color) => {
                const newFaculties = [...facultyData];
                newFaculties[colorPicker.index].color = color.hex;
                setFacultyData(newFaculties);
              }}
            />
          )}
          <Button onClick={onSubmitStep3}>Next</Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Map Codes to Faculties</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Faculty</th>
              </tr>
            </thead>
            <tbody>
              {table1Data.map((row, index) => (
                <tr key={index}>
                  <td>{row.code}</td>
                  <td>
                    <select
                      className="form-control"
                      onChange={(e) => setMappingData({ ...mappingData, [row.code]: e.target.value })}
                    >
                      <option value="">Select</option>
                      {facultyData.map((fac, idx) => (
                        <option key={idx} value={fac.name}>{fac.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={onSubmitStep4}>Next</Button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h4>Final Setup</h4>
          <Button onClick={() => setModalShow(true)}>Open Final Inputs</Button>
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Final Inputs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>List your year levels:</label>
              <input {...register("yearLevels", { required: true })} className="form-control" type="number" />
              <label>How many periods in your grid?</label>
              <input {...register("periods", { required: true })} className="form-control" type="number" />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit(onSubmitStep5)}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
