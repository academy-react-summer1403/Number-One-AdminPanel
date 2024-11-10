const MoreInfoItems = ({ icon, label, action }) => {
  return (
    <div className="d-flex mt-2">
      <div className="flex-shrink-0">
        <img className="me-1" src={icon} alt="" height="38" width="38" />
      </div>
      <div className="d-flex align-item-center justify-content-between flex-grow-1">
        <div className="me-1">
          <p className="fw-bolder mb-0">{label}</p>
          <span>{action}</span>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoItems;
