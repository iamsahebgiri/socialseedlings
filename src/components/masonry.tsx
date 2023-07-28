import React from "react";

interface MasonryProps {
  children: React.ReactNode[];
  columnsCount?: number;
}

export function Masonry({ children, columnsCount = 3 }: MasonryProps) {
  const getColumns = () => {
    const columns: React.ReactElement[][] = Array.from(
      { length: columnsCount },
      () => []
    );

    children.forEach((child, index) => {
      if (child && React.isValidElement(child)) {
        columns[index % columnsCount].push(child);
      }
    });

    return columns;
  };

  const renderColumns = () => {
    const columns = getColumns();
    return columns.map((column, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignContent: "stretch",
          flex: 1,
          // width: 0,
          gap: "2rem"
        }}
      >
        {column.map((item) => item)}
      </div>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "stretch",
        width: "100%",
        gap: "2rem"
      }}
    >
      {renderColumns()}
    </div>
  );
}
