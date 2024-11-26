const HeaderTable = ({ titles }) => {
  return (
    <thead>
      <tr >
        {titles.map((title, index) => (
          <th key={index} className="text-center">{title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
