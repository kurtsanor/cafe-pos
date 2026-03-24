import { Flex, Group, Paper, SimpleGrid } from "@mantine/core";
import StatsCard from "../components/cards/StatsCard";
import classes from "../styles/Dashboard.module.css";
import { AreaChart, DonutChart } from "@mantine/charts";

const data = [
  { date: "Mar 1", Sales: 1200 },
  { date: "Mar 2", Sales: 2800 },
  { date: "Mar 3", Sales: 6900 },
  { date: "Mar 4", Sales: 3400 },
  { date: "Mar 5", Sales: 2100 },
  { date: "Mar 6", Sales: 4200 },
  { date: "Mar 7", Sales: 3100 },
  { date: "Mar 8", Sales: 7500 },
  { date: "Mar 9", Sales: 2900 },
  { date: "Mar 10", Sales: 3800 },
  { date: "Mar 11", Sales: 2200 },
  { date: "Mar 12", Sales: 4500 },
  { date: "Mar 13", Sales: 3300 },
  { date: "Mar 14", Sales: 1800 },
  { date: "Mar 15", Sales: 3600 },
];

const productData = [
  { name: "Latte", value: 142, color: "indigo.6" },
  { name: "Americano", value: 118, color: "teal.6" },
  { name: "Matcha Latte", value: 95, color: "violet.6" },
  { name: "Carbonara", value: 73, color: "cyan.6" },
  { name: "Espresso", value: 61, color: "blue.6" },
];

const Dashboard = () => {
  return (
    <main className={classes.main}>
      <SimpleGrid cols={4} mb={"md"}>
        <StatsCard diff={12} title="Revenue Today" value={4000} />
        <StatsCard diff={12} title="Products" value={4000} />
        <StatsCard diff={12} title="Total Sales" value={4000} />
        <StatsCard diff={12} title="Net Pay" value={4000} />
      </SimpleGrid>

      <Flex gap={"lg"}>
        <Paper shadow="xs" p={"md"} flex={3}>
          <h5 className={classes.chart__title}>Sales Overview</h5>
          <AreaChart
            mt={"lg"}
            h={200}
            data={data}
            dataKey="date"
            series={[{ name: "Sales", color: "blue" }]}
            curveType="linear"
            gridAxis="x"
            gridProps={{ xAxisId: "bottom", yAxisId: "left" }}
          />
        </Paper>
        <Paper shadow="xs" p="md" flex={1}>
          <h5 className={classes.chart__title}>Top 5 Most Ordered</h5>
          <DonutChart
            w={"100%"}
            data={productData}
            h={"100%"}
            paddingAngle={3}
            withLabels
            withLabelsLine={false}
            labelsType="percent"
          />
        </Paper>
      </Flex>
    </main>
  );
};

export default Dashboard;
