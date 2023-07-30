import React from "react";
import style from "./masonry.module.css";

interface MasonryProps {
  children: React.ReactNode[];
  columnsCount?: number;
}

export function Masonry({ children, columnsCount = 2 }: MasonryProps) {
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
      <div key={i} className={style.masonry__column}>
        {column.map((item) => item)}
      </div>
    ));
  };

  return <div className={style.masonry__parent}>{renderColumns()}</div>;
}
