import { Col, Form, Row } from "antd";
import { FormikHelpers, useFormik } from "formik";
import handlers from "../../Components/handlers";
import validate from "./validate";
import { SidebarButtonContainer } from "../../Styles/style";
import Player, {
  PlayerFactory,
} from "../../../Domain/Player";
import { SidebarPlayer } from "../../Components/Sidebar/style";
import Input from "../../Components/Input/Input";
import ConfirmButton from "../../Components/Button/ConfirmButton";
import CancelButton from "../../Components/Button/CancelButton";
import PlayerService from "../../../Service/PlayerService";
import Incomplete from "../../../Common/Incomplete";

type Props = {
  isOpen: boolean;
  onClose(): void
  player?: Player
};

function EditPlayerSidebar({ isOpen, onClose, player}: Props) {
  const onSubmit = async (
    values: Incomplete<Player>
  ) => {
    const newPlayer = PlayerFactory(values);
    formik.resetForm();
    updatePlayer(newPlayer);
    onClose();
  };


  const formik = useFormik<Incomplete<Player>>({
    initialValues: player || PlayerFactory({}),
    onSubmit,
    validate: (values: Partial<Player>) => validate(values),
    enableReinitialize: true,
  });

  const updatePlayer = async (newPlayer: Player) => {
    await PlayerService.update(newPlayer);
  };


  return (
    <SidebarPlayer
      header={"Editar Jogador"}
      isOpen={isOpen}
      onClose={onClose}
      width={"47.5rem"}
    >
      <Form onSubmitCapture={(e) => e.preventDefault()} layout="vertical">
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Nome"}>
              <Input {...handlers.string(formik, "name")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Email"}>
              <Input {...handlers.string(formik, "email")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12} lg={12}>
            <Form.Item label={"Telefone"}>
              <Input {...handlers.string(formik, "cellphone")} />
            </Form.Item>
          </Col>
          <Col xs={12} lg={12}>
            <Form.Item label={"Cartão"}>
              <Input {...handlers.number(formik, "card")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <SidebarButtonContainer>
        <CancelButton onClick={onClose} children={"Cancel"} />
        <ConfirmButton onClick={formik.submitForm} children={"Salvar"} />
      </SidebarButtonContainer>
    </SidebarPlayer>
  );
}
export default EditPlayerSidebar;
