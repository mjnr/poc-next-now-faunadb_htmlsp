import { useState } from "react";

export default function useLeadForm({ $form }) {
  const [isLoading, setIsLoading] = useState(false);

  function onSaveContact(e) {
    e.preventDefault();

    setIsLoading(true);

    const contactFormData = new FormData($form.current);
    const contactData = Array.from(contactFormData.entries()).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: value
        };
      },
      {}
    );

    fetch("/api/saveContact", {
      method: "POST",
      body: JSON.stringify(contactData)
    })
      .then(e => setIsLoading(false))
      .catch(err => {
        console.log(err);
      });
  }

  return {
    onSaveContact,
    isLoading
  };
}
