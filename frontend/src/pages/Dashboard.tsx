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

const Dashboard = () => {
  const [opened, setOpened] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
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

  if (isLoading || salesLoading)
    return (
      <Center w={"100%"}>
        <Loader />
      </Center>
    );

  if (isError || salesError) return <div>Error fetching data.</div>;

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
                  size="xs"
                  value={selectedMonth}
                  onChange={(date: any) => {
                    setSelectedMonth(date);
                    setOpened(false); // close popover after selection
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
