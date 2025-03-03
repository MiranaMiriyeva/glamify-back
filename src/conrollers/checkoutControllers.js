import { GlamifyCheckout } from "../model/checkoutModul.js";

export async function GetAllCheckouts(req, res) {
  try {
    let data = await GlamifyCheckout.find();
    res.status(200).send(data); // HTTP durum kodunu ekledik
  } catch (error) {
    res.status(500).send({ message: "Error fetching checkouts", error }); // Hata mesajını daha açıklayıcı yaptık
  }
}

export async function GetOneCheckout(req, res) {
  try {
    let data = await GlamifyCheckout.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Checkout not found" }); // 404 durum kodu ekledik
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching checkout", error });
  }
}

export async function CreateCheckout(req, res) {
  try {
    const checkoutData = req.body;

    // paymentMethod'a göre gerekli alanları kontrol ediyoruz
    if (
      checkoutData.paymentMethod === "Credit Card" &&
      (!checkoutData.cardNumber ||
        !checkoutData.cardExpiry ||
        !checkoutData.cardCVC)
    ) {
      return res
        .status(400)
        .send({ message: "Credit card details are required" });
    }
    if (checkoutData.paymentMethod === "PayPal" && !checkoutData.paypalEmail) {
      return res.status(400).send({ message: "PayPal email is required" });
    }
    if (
      checkoutData.paymentMethod === "Bank Transfer" &&
      !checkoutData.bankAccount
    ) {
      return res
        .status(400)
        .send({ message: "Bank account details are required" });
    }

    let data = await GlamifyCheckout.create(checkoutData);
    res.status(201).send(data); // 201 durum kodu ekledik
  } catch (error) {
    res.status(500).send({ message: "Error creating checkout", error });
  }
}

export async function UpdateCheckout(req, res) {
  try {
    const checkoutData = req.body;

    // paymentMethod'a göre gerekli alanları kontrol ediyoruz
    if (
      checkoutData.paymentMethod === "Credit Card" &&
      (!checkoutData.cardNumber ||
        !checkoutData.cardExpiry ||
        !checkoutData.cardCVC)
    ) {
      return res
        .status(400)
        .send({ message: "Credit card details are required" });
    }
    if (checkoutData.paymentMethod === "PayPal" && !checkoutData.paypalEmail) {
      return res.status(400).send({ message: "PayPal email is required" });
    }
    if (
      checkoutData.paymentMethod === "Bank Transfer" &&
      !checkoutData.bankAccount
    ) {
      return res
        .status(400)
        .send({ message: "Bank account details are required" });
    }

    let data = await GlamifyCheckout.findByIdAndUpdate(
      req.params.id,
      checkoutData,
      { new: true }
    );
    if (!data) {
      return res.status(404).send({ message: "Checkout not found" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Error updating checkout", error });
  }
}

export async function DeleteCheckout(req, res) {
  try {
    let data = await GlamifyCheckout.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Checkout not found" });
    }
    res.status(200).send({ message: "Checkout deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting checkout", error });
  }
}
