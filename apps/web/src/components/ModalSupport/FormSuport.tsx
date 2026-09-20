import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SuportInput from "./SuportInput";
import CtaContact from "@/components/Button/CtaContact";
import clsx from "clsx";

type FormSuportValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type FormSuportProps = {
  onClose: () => void;
};

const FormSuport = ({ onClose }: FormSuportProps) => {
  const initialValues: FormSuportValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Invalid phone number"),
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
    message: Yup.string()
      .required("message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  const handleSubmit = async (
    values: FormSuportValues,
    { setSubmitting, resetForm }: FormikHelpers<FormSuportValues>,
  ) => {
    try {
      const response = await fetch("/api/send-contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      if (!result.emailSent) {
        toast.warn(
          "Your message was received, but the confirmation email was not sent.",
        );
      }
      resetForm();
      onClose();
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <SuportInput id="name" name="name" type="text" label="Name" />

          <SuportInput id="phone" name="phone" type="Phone" label="Phone" />

          <SuportInput id="email" name="email" type="email" label="Email" />

          <SuportInput
            id="message"
            name="message"
            type="textarea"
            label="Message"
          />
          <CtaContact
            className={clsx(
              "py-4 px-8 md:py-4 md:px-12 cursor-pointer rounded-xl bg-cta-submit",
              "font-oswald font-semibold text-secondary",
            )}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send message..."}
          </CtaContact>
        </Form>
      )}
    </Formik>
  );
};

export default FormSuport;
