export const sysadmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const supervisor = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "supervisor"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const wilayah = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "wilayah", "daerah"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const internal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = [
    "sysadmin",
    "admin",
    "supervisor",
    "wilayah",
    "daerah",
    "armada",
    "keuangan",
  ];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const external = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = [
    "sysadmin",
    "admin",
    "supervisor",
    "armada",
    "pendamping",
    "p4nj",
  ];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const keuangan = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "keuangan"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const bps = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "bps"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const armada = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "armada"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const pendamping = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "pendamping"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const p4nj = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "p4nj"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const notWilayahKeuangan = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["wilayah", "daerah", "keuangan", "bps"];
  if (!roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const notInternal = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["pendamping", "p4nj", "bps"];
  if (!roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const notPendamping = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["pendamping"];
  if (!roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
export const internalNonDaerah = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = ["sysadmin", "admin", "wilayah"];
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
