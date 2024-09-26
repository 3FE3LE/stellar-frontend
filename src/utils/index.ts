interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}
export function enumToOptions<T extends { [key: string]: string | number }>(
  enumObject: T,
  labelGenerator?: (key: string) => string
): SelectOption<T[keyof T]>[] {
  // Función por defecto para generar labels si no se proporciona una
  const defaultLabelGenerator = (key: string) =>
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // Usar la función de generación de labels proporcionada o la por defecto
  const getLabelForKey = labelGenerator || defaultLabelGenerator;

  return Object.entries(enumObject).map(([key, value]) => ({
    label: getLabelForKey(key),
    value: value as T[keyof T],
  }));
}
