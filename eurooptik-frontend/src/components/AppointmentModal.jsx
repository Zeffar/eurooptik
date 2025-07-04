import React from 'react';

const AppointmentModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <section id="programare-section" style={{ padding: '40px 0', background: '#f9f9f9' }}>
      <button onClick={onClose} style={{ float: 'right', margin: '10px', fontSize: '22px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>
        ×
      </button>
      <h2>Programează-te online</h2>
      <div style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
        <iframe
          src="https://eurooptik.ro.programarionline.sophtha.com/"
          style={{ width: '100%', minHeight: '600px', border: 'none' }}
          title="Programare online">
        </iframe>
      </div>
    </section>
  );
}

export default AppointmentModal