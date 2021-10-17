import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Container,
  Row,
  Form,
  Input,
  Label,
  Field,
  Button,
  Select,
  Checkbox,
  Required,
  RequiredText,
  Title,
} from "./styles/TicketFormElements";

const TicketForm = ({
  onChange,
  refId,
  passengerNumber,
  onRemovePassenger
}) => {
  const formik = useFormik({
    initialValues: {
      isFSS: false,
      fssNumber: "",
      firstName: "",
      lastName: "",
      patronymic: "",
      gender: "",
      birthDate: "",
      country: "",
      document: "",
      documentNumber: "",
      fare: "",
      phone: "",
      email: "",
      isConsentToNotification: false,
      isBonusCard: false,
      cardMultiPass: "",
      cardUniversal: "",
      loyalDiscountNum: "",
      cardBonus: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .trim()
        .typeError("Должна быть строка")
        .matches(/^[^a-zA-Z0-9]+$/, "Недопустимые символы")
        .required("Поле обязательно"),
      lastName: yup
        .string()
        .trim()
        .typeError("Должна быть строка")
        .matches(/^[^a-zA-Z0-9]+$/, "Недопустимые символы")
        .required("Поле обязательно"),
      patronymic: yup
        .string()
        .trim()
        .typeError("Должна быть строка")
        .matches(/^[^a-zA-Z0-9]+$/, "Недопустимые символы")
        .required("Поле обязательно"),
      gender: yup.string().required("Поле обязательно"),
      birthDate: yup.string().required("Поле обязательно"),
      country: yup.string().required("Поле обязательно"),
      document: yup.string(),
      documentNumber: yup
        .string()
        .trim()
        .matches(/^\d+$/, "Недопустимые символы")
        .min(10, "Некорректный формат")
        .max(10, "Некорректный формат")
        .required("Поле обязательно"),
      fare: yup.string().required("Поле обязательно"),
      phone: yup.string().when("isConsentToNotification", {
        is: true,
        then: yup
          .string()
          .trim()
          .matches(
            /\+7\d{1,11}/,
            "Введите номер телефона в формате +7**********, где после знака " +
              " указан код страны"
          )
          .required("Введите номер телефона"),
        otherwise: yup.string(),
      }),
      isConsentToNotification: yup.boolean(),
      email: yup.string().when("isConsentToNotification", {
        is: true,
        then: yup
          .string()
          .trim()
          .email("Некорректный формат e-mail")
          .required("Введите email"),
        otherwise: yup.string(),
      }),
      isFSS: yup.boolean(),
      fssNumber: yup.string().when("isFSS", {
        is: true,
        then: yup
          .string()
          .trim()
          .matches(/^\d+$/, "Недопустимые символы")
          .min(11, "Формат СНИЛС: 11 цифр")
          .required("Формат СНИЛС: 11 цифр"),
        otherwise: yup.string(),
      }),
    }),
    onSubmit: () => {
      watchForm();
    },
  });

  React.useImperativeHandle(refId, () => ({
    Submit: async () => {
      await formik.submitForm();
    },
  }));

  function watchForm() {
    if (onChange) {
      onChange(
        {
          values: formik.values,
          validated: formik.isSubmitting
            ? Object.keys(formik.errors).length === 0
            : false,
        },
        formik.resetForm
      );
    }
  }

  const hasErrors = (field) => {
    return (
      formik.touched.hasOwnProperty(field) &&
      formik.errors.hasOwnProperty(field)
    );
  };
  return (
    <Container>
      <Row justify="space-between">
        <Title color="#2d3091">Пассажир №{passengerNumber}</Title>
        <Button
          disabled={passengerNumber === 1}
          onClick={(event) => onRemovePassenger(event, passengerNumber)}
        >
          Удалить пассажира
        </Button>
      </Row>
      <Form>
        <Row>
          <Field direction="row" width="100%">
            <Label>
              <Checkbox
                name={`isFSS`}
                defaultChecked={formik.values.isFSS}
                onChange={formik.handleChange}
              />
              Оформление билета по ФСС
            </Label>
          </Field>
        </Row>
        <Row>
          {formik.values.isFSS && (
            <Field>
              <Label>СНИЛС или номер регистрации ЦСМ</Label>
              <Input
                type="text"
                name={`fssNumber`}
                maxLength="11"
                value={formik.values.fssNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={hasErrors("fssNumber")}
              />
              {hasErrors("fssNumber") && (
                <RequiredText>{formik.errors.fssNumber}</RequiredText>
              )}
            </Field>
          )}
        </Row>
        <Row>
          <Field>
            <Label>
              Фамилия
              <Required children={"*"} />
            </Label>
            <Input
              type="text"
              name={`lastName`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("lastName")}
            />
            {hasErrors("lastName") && (
              <RequiredText>{formik.errors.lastName}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Имя
              <Required children={"*"} />
            </Label>
            <Input
              type="text"
              name={`firstName`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("firstName")}
            />
            {hasErrors("firstName") && (
              <RequiredText>{formik.errors.firstName}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Отчество (обязательно, при наличии)
              <Required children={"*"} />
            </Label>
            <Input
              type="text"
              name={`patronymic`}
              value={formik.values.patronymic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("patronymic")}
            />
            {hasErrors("patronymic") && (
              <RequiredText>{formik.errors.patronymic}</RequiredText>
            )}
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>
              Пол
              <Required children={"*"} />
            </Label>
            <Select
              name={`gender`}
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("gender")}
            >
              <option disabled value="">
                не выбрано
              </option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </Select>
            {hasErrors("gender") && (
              <RequiredText>{formik.errors.gender}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Дата рождения
              <Required children={"*"} />
            </Label>
            <Input
              type="date"
              name={`birthDate`}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("birthDate")}
            />
            {hasErrors("birthDate") && (
              <RequiredText>{formik.errors.birthDate}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Гражданство
              <Required children={"*"} />
            </Label>
            <Select
              name={`country`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("country")}
            >
              <option disabled value="">
                не выбрано
              </option>
              <option value="1">Россия</option>
              <option value="2">Казахстан</option>
            </Select>
            {hasErrors("country") && (
              <RequiredText>{formik.errors.country}</RequiredText>
            )}
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>
              Тип документа
              <Required children={"*"} />
            </Label>
            <Select
              name={`document`}
              value={formik.values.document}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("document")}
            >
              <option defaultValue="1">Паспорт РФ</option>
              <option value="2">Заграничный Паспорт</option>
              <option value="3">Свидетельство о рождении</option>
              <option value="4">Иностранный документ</option>
            </Select>
            {hasErrors("document") && (
              <RequiredText>{formik.errors.document}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Номер документа
              <Required children={"*"} />
            </Label>
            <Input
              type="text"
              name={`documentNumber`}
              value={formik.values.documentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("documentNumber")}
            />
            {hasErrors("documentNumber") && (
              <RequiredText>{formik.errors.documentNumber}</RequiredText>
            )}
          </Field>
          <Field>
            <Label>
              Тариф
              <Required children={"*"} />
            </Label>
            <Select
              disabled={!formik.values.birthDate}
              name={`fare`}
              value={formik.values.fare}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasErrors("fare")}
            >
              <option disabled value="">
                не выбрано
              </option>
              <option value="1">Полный</option>
              <option value="2">День рождения. Сопровождающий</option>
              <option value="3">Семейный</option>
            </Select>
            {hasErrors("fare") && (
              <RequiredText>{formik.errors.fare}</RequiredText>
            )}
          </Field>
        </Row>
        <Row>
          <Field direction="row" width="100%">
            <Label>
              <Checkbox
                name={`isConsentToNotification`}
                defaultChecked={formik.values.isConsentToNotification}
                onChange={formik.handleChange}
              />
              Согласен на получение оповещений в случаях чрезвычайных ситуаций
              на железнодорожном транспорте
            </Label>
            <p></p>
          </Field>
        </Row>
        {formik.values.isConsentToNotification && (
          <Row justify="unset">
            <Field>
              <Label>Телефон пассажира</Label>
              <Input
                type="tel"
                name={`phone`}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={hasErrors("phone")}
              />
              {hasErrors("phone") && (
                <RequiredText>{formik.errors.phone}</RequiredText>
              )}
            </Field>
            <Field>
              <Label>E-mail пассажира</Label>
              <Input
                type="email"
                name={`email`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={hasErrors("email")}
              />
              {hasErrors("email") && (
                <RequiredText>{formik.errors.email}</RequiredText>
              )}
            </Field>
          </Row>
        )}
        <Row>
          <Field direction="row" width="100%" borderBottom="1px solid #f2f2f2">
            <Label>
              <Checkbox
                name={`isBonusCard`}
                defaultChecked={formik.values.isBonusCard}
                onChange={formik.handleChange}
              />
              Указать номер бонусной, электронной, дорожной карты, делового
              проездного или промокода
            </Label>
            <p></p>
          </Field>
        </Row>

        {formik.values.isBonusCard && (
          <>
            <Row>
              <Field>
                <Label>Деловой проездной</Label>
                <Input
                  id="cardMultiPass"
                  type="text"
                  name={`cardMultiPass`}
                  value={formik.values.cardMultiPass}
                  placeholder="Введите номер карты"
                  onChange={formik.handleChange}
                />
              </Field>
              <Field>
                <Label>Дорожная или электронная карта или промокод</Label>
                <Input
                  type="text"
                  name={`cardUniversal`}
                  value={formik.values.cardUniversal}
                  placeholder="Введите номер или код"
                  onChange={formik.handleChange}
                />
              </Field>
              <Field>
                <Label>
                  Акции "РЖД Бонус": для пенсионеров, студентов, по партнерским
                  картам
                </Label>
                <Input
                  type="text"
                  name={`loyalDiscountNum`}
                  value={formik.values.loyalDiscountNum}
                  placeholder="Введите номер карты"
                  onChange={formik.handleChange}
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <Label>Номер РЖД Бонус / накопление баллов</Label>
                <Input
                  type="text"
                  name={`cardBonus`}
                  value={formik.values.cardBonus}
                  placeholder="Введите номер карты"
                  onChange={formik.handleChange}
                />
              </Field>
            </Row>
          </>
        )}
      </Form>
    </Container>
  );
};

export default TicketForm;
