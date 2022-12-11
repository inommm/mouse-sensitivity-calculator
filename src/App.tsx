import React, { useMemo, useState } from "react";
import "./App.scss";
import { Card, Col, Form, Row } from "react-bootstrap";

const yawValues = {
  Valorant: 0.07,
  "Rainbow Six: Siege": 0.005729577951308232087679815481411,
};

function calc360distance(params: {
  dpi: number;
  yaw: number;
  inGameSens: number;
}): number {
  const cm = 2.54;
  return (360 * cm) / (params.dpi * params.yaw * params.inGameSens);
}

function App() {
  const [yaw, setYaw] = useState<number>(Object.values(yawValues)[0]);
  const [dpi, setDpi] = useState<number>();
  const [inGameSens, setInGameSens] = useState<number>();

  const handleYawChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYaw(Number(event.target.value));
  };

  const handleDpiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDpi(event.target.valueAsNumber);
  };

  const handleInGameSens = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInGameSens(event.target.valueAsNumber);
  };

  const distance360 = useMemo(() => {
    if (yaw && dpi && inGameSens) {
      return calc360distance({ yaw, dpi, inGameSens });
    }
  }, [dpi, inGameSens, yaw]);

  const distance180 = useMemo(() => {
    if (distance360) {
      return distance360 / 2;
    }
  }, [distance360]);

  return (
    <main>
      <Row>
        <Col lg="12">
          <div className="d-flex flex-column position-absolute top-50 start-50 translate-middle">
            <div>
              <h1 className="title">Mouse Sensitivity Calculator</h1>
            </div>
            <Card className="calculator shadow rounded border-0">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>ゲームタイトル</Form.Label>
                    <Form.Select value={yaw} onChange={handleYawChange}>
                      {Object.entries(yawValues).map(([title, yaw], index) => (
                        <option value={yaw}>{title}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>DPI</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="400"
                      value={dpi}
                      onChange={handleDpiChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>ゲーム内マウス感度</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0.6"
                      value={inGameSens}
                      onChange={handleInGameSens}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Body className="pb-5">
                <strong>
                  あなたの振り向きは:{" "}
                  {distance180 && <>{Math.round(distance180 * 100) / 100}cm</>}
                </strong>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </main>
  );
}

export default App;
