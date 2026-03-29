import { Paper, Group, Text } from "@mantine/core";
import classes from "../../styles/StatsCard.module.css";
import { IconArrowUpRight, type IconProps } from "@tabler/icons-react";
import { formatToTwoDecimals } from "../../utils/currencyFormatter";

interface StatsCardInterface {
  title: string;
  value: number;
  diff: number;
  isCurrencyValue: boolean;
  Icon: React.FC<IconProps>;
}

const StatsCard = ({
  title,
  value,
  diff,
  isCurrencyValue,
  Icon,
}: StatsCardInterface) => {
  return (
    <Paper shadow="xs" p="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>
        <Icon className={classes.icon} size={22} stroke={1.5} />
      </Group>

      <Group align="flex-end" gap="xs" mt={"xs"}>
        <h3 className={classes.value}>
          {isCurrencyValue && "₱"}
          {isCurrencyValue ? formatToTwoDecimals(value) : value}
        </h3>
        <Text c={diff > 0 ? "teal" : "red"} className={classes.diff}>
          <span className={classes.diff}> {diff}%</span>
          <IconArrowUpRight size={16} stroke={1.5} />
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
};

export default StatsCard;
