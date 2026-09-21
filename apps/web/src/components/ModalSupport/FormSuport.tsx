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
        <Form className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <SuportInput
              id="name"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />

            <SuportInput
              id="phone"
              name="phone"
              type="Phone"
              label="Phone"
              placeholder="Enter phone nr."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <SuportInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
            />

            <SuportInput
              id="message"
              name="message"
              type="textarea"
              label="Message"
              rows={4}
              placeholder="How can we help you ?"
            />
          </div>
          <CtaContact
            className={clsx(
              "md:py-3.5! md:px-12! cursor-pointer rounded-full! bg-cta-submit",
              "font-oswald font-semibold text-cta-tertiary! text-base uppercase",
              "hover:bg-[#f3274c] hover:text-white! active:scale-[0.98] transition-all",
            )}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </CtaContact>
        </Form>
      )}
    </Formik>
  );
};

export default FormSuport;
