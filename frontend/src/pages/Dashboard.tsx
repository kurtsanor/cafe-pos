import {
  ActionIcon,
  Center,
  Flex,
  Loader,
  Paper,
  Popover,
  SimpleGrid,
} from "@mantine/core";
import StatsCard from "../components/cards/StatsCard";
import classes from "../styles/Dashboard.module.css";
import { AreaChart, BarChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getSalesByDate } from "../api/analytics.api";
import { IconFilter2 } from "@tabler/icons-react";
import { useState } from "react";
import { MonthPicker } from "@mantine/dates";

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

const Dashboard = () => {
  const [opened, setOpened] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const {
    data: analytics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: getDashboardStats,
  });

  const {
    data: salesOverview,
    isLoading: salesLoading,
    isError: salesError,
  } = useQuery({
    queryKey: ["sales", selectedMonth],
    queryFn: () => getSalesByDate(selectedMonth || new Date()),
  });

  if (isLoading)
    return (
      <Center w={"100%"}>
        <Loader />
      </Center>
    );

  if (isError) return <div>Error fetching products.</div>;

  const mostOrderedProducts = analytics?.data?.mostOrderedProducts.map(
    (data) => {
      return data;
    },
  );

  const salesOverviewData = salesOverview?.data?.map((data) => data);

  return (
    <main className={classes.main}>
      <SimpleGrid cols={4} mb="md">
        <StatsCard
          isCurrencyValue={true}
          diff={12}
          title="Sales Today"
          value={analytics?.data?.salesToday || 0}
        />
        <StatsCard
          isCurrencyValue={false}
          diff={12}
          title="Products"
          value={analytics?.data?.totalProducts || 0}
        />
        <StatsCard
          isCurrencyValue={false}
          diff={12}
          title="Total Transactions"
          value={analytics?.data?.totalOrders || 0}
        />
        <StatsCard
          isCurrencyValue={true}
          diff={12}
          title="Avg Order Value"
          value={analytics?.data?.averageOrderValue || 0}
        />
      </SimpleGrid>

      <Flex gap="lg">
        <Paper shadow="xs" p="md" flex={1}>
          <Flex justify={"space-between"}>
            <h5 className={classes.chart__title}>Sales Overview</h5>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              position="bottom-end"
              withArrow
              trapFocus={false}
            >
              <Popover.Target>
                <ActionIcon
                  onClick={() => setOpened((o) => !o)}
                  variant="default"
                >
                  <IconFilter2 />
                </ActionIcon>
              </Popover.Target>

              <Popover.Dropdown>
                <MonthPicker
                  value={selectedMonth}
                  onChange={(date: any) => {
                    setSelectedMonth(date);
                    setOpened(false); // close popover after selection
                    console.log(date);
                  }}
                />
              </Popover.Dropdown>
            </Popover>
          </Flex>

          <AreaChart
            mt={"lg"}
            h={260}
            data={salesOverviewData || []}
            dataKey="date"
            series={[{ name: "Sales", color: "green" }]}
            curveType="linear"
            withDots={false}
            gridAxis="x"
            gridProps={{ xAxisId: "bottom", yAxisId: "left" }}
          />
        </Paper>
        <Paper shadow="xs" p="md" flex={1}>
          <h5 className={classes.chart__title}>Top 5 Most Ordered</h5>
          <BarChart
            mt="lg"
            h={260}
            data={mostOrderedProducts || []}
            dataKey="product"
            orientation="horizontal"
            yAxisProps={{ width: 50 }}
            barProps={{ radius: 10 }}
            series={[{ name: "Orders", color: "orange.5" }]}
            gridAxis="x"
            gridProps={{ xAxisId: "bottom", yAxisId: "left" }}
          />
        </Paper>
      </Flex>
    </main>
  );
};

export default Dashboard;
