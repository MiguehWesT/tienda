const API_BASE = "http://3.236.252.150:3000/api/v1";
const AUTH_URL = `${API_BASE}/auth`;

export async function login(email, password) {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const msg =
        data?.message || "Credenciales incorrectas. Intenta nuevamente.";
      throw new Error(msg);
    }

    const user = data.user;
    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (err) {
    console.error("Error en loginService:", err);
    throw err;
  }
}

export async function register(nombre, email, password) {
  try {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const msg =
        data?.message || "No se pudo registrar el usuario. Intenta más tarde.";
      throw new Error(msg);
    }

    const user = data.user || {
      id: data.id,
      nombre,
      email,
      rol: "cliente",
    };

    localStorage.setItem("user", JSON.stringify(user));


    return user;
  } catch (err) {
    console.error("Error en registerService:", err);
    throw err;
  }
}

export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token");
  }

  const res = await fetch(`${AUTH_URL}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.message || "Token inválido o expirado");
  }

  return data.user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
