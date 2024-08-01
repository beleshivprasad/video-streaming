import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string().required().min(5).label("Username"),
  password: Yup.string().required().min(8).label("Password")
});

export default schema;
