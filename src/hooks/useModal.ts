import { useState } from "react";

export default function useModal() {
  const [modalData, setModalData] = useState({
    showId: "",
    open: false,
  });

  return { modalData, setModalData };
}
