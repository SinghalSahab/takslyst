export const dataGridClassNames =
  "border border-[#262626] bg-[#101010] shadow text-zinc-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-root": {
      backgroundColor: "#101010",
      color: "#e5e5e5",
    },

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#101010",
      color: "#e5e5e5",
      borderBottom: "1px solid #262626",
    },

    '& .MuiDataGrid-columnHeaders [role="row"] > *': {
      backgroundColor: "#101010",
      borderColor: "#262626",
    },

    "& .MuiDataGrid-row": {
      backgroundColor: "#101010",
      borderBottom: "1px solid #262626",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#181818",
    },

    "& .MuiDataGrid-cell": {
      border: "none",
      color: "#d4d4d8",
    },

    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#101010",
      borderTop: "1px solid #262626",
    },

    "& .MuiIconButton-root": {
      color: "#a3a3a3",
    },

    "& .MuiTablePagination-root": {
      color: "#a3a3a3",
    },

    "& .MuiTablePagination-selectIcon": {
      color: "#a3a3a3",
    },

    "& .MuiDataGrid-withBorderColor": {
      borderColor: "#262626",
    },
  };
};
