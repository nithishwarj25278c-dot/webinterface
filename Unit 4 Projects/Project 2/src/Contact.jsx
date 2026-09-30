function Contact() {
  return (
    <div className="page contact">

      <h1>Contact Me</h1>

      <div className="contact-info">
        <p><b>Name:</b> Nithishwar J</p>
        <p><b>Course:</b> CSE - Cybersecurity</p>
        <p><b>Email:</b> nithishwar@gmail.com</p>
        <p><b>Phone:</b> 9876543210</p>
      </div>

      <form>
        <input type="text" placeholder="Your Name" />

        <input type="email" placeholder="Your Email" />

        <textarea placeholder="Your Message"></textarea>

        <button type="submit">Send Message</button>
      </form>

    </div>
  );
}

export default Contact;