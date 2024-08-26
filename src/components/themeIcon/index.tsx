import { createElement } from "react";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { ButtonProps as AntdButtonProps } from "antd/lib/button/button";
import { useThemeContext } from "@/context/themeContext";
import { Button } from "antd";

type ThemeIconProps = {
  icon: React.ElementType<Omit<AntdIconProps, "ref">>;
};

type ThemeButtonProps = ThemeIconProps & Omit<AntdButtonProps, "icon">;

export const ThemeIcon = ({ icon }: ThemeIconProps) => {
  const { theme } = useThemeContext();

  return createElement(icon, {
    style: { color: theme === "dark" ? "white" : "black" },
  });
};

export const ThemeButton = ({ icon, ...buttonProps }: ThemeButtonProps) => {
  const { theme } = useThemeContext();

  return (
    <Button
      icon={ThemeIcon({ icon })}
      style={{ color: theme === "dark" ? "white" : "black" }}
      {...buttonProps}
    />
  );
};
