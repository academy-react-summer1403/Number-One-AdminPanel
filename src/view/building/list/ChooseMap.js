import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const ChooseMap = ({ isOpen, toggle }) => {
  const [position, setPosition] = useState([36.5510685, 53.0517062]); // موقعیت پیش‌فرض (تهران)
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: address,
            key: "7e0313e1defd4ce380ce7e432fdae0e6",
            language: "fa",
            limit: 1,
          },
        }
      );

      console.log(response)
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setPosition([lat, lng]);
        setError(""); // خطا را پاک می‌کند
      } else {
        setError("هیچ نتیجه‌ای پیدا نشد.");
      }
    } catch (err) {
      setError("خطایی در هنگام جستجو رخ داد.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">انتخاب نشانی</h1>
        </div>
        <Row className="gy-1 pt-75">
          <Col xs={12}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس خود را وارد کنید"
            />
            <button onClick={handleSearch}>جستجو</button>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <div style={{ height: "400px", width: "600px", position: "relative" }}>
            <MapContainer
              center={position}
              zoom={13}
              className="w-100 h-100"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  موقعیت انتخاب شده: {position[0].toFixed(4)},{" "}
                  {position[1].toFixed(4)}
                </Popup>
              </Marker>
            </MapContainer>
            </div>
          </Col>
          <Col xs={12} className="text-center mt-2 pt-50">
            <Button type="submit" className="me-1" color="primary">
              ثبت
            </Button>
            <Button type="reset" color="secondary" outline onClick={toggle}>
              لغو
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ChooseMap;
