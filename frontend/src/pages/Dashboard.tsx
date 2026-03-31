import {
  ActionIcon,
  Center,
  Flex,
  Grid,
  Loader,
  Paper,
  Popover,
} from "@mantine/core";
import StatsCard from "../components/cards/StatsCard";
import classes from "../styles/Dashboard.module.css";
import { AreaChart, BarChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getSalesByDate } from "../api/analytics.api";
import {
  IconChartBar,
  IconCurrencyPeso,
  IconFilter2,
  IconPackage,
  IconReceipt,
} from "@tabler/icons-react";
import { useState } from "react";
import { MonthPicker } from "@mantine/dates";
import { formatToTwoDecimals } from "../utils/currencyFormatter";

const Dashboard = () => {
  const [opened, setOpened] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const normalizedDate = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1,
  );
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
    queryKey: ["sales", normalizedDate],
    queryFn: () => getSalesByDate(normalizedDate),
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

  const totalSalesOverview = salesOverview?.data?.reduce(
    (sum, data) => sum + data.Sales,
    0,
  );

  return (
    <main className={classes.main}>
      <Grid mb="md">
        <Grid.Col span={{ base: 12, xs: 6, md: 3, lg: 3 }}>
          <StatsCard
            Icon={IconCurrencyPeso}
            isCurrencyValue={true}
            diff={12}
            title="Sales Today"
            value={analytics?.data?.salesToday || 0}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, md: 3, lg: 3 }}>
          <StatsCard
            Icon={IconPackage}
            isCurrencyValue={false}
            diff={12}
            title="Products"
            value={analytics?.data?.totalProducts || 0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3, lg: 3 }}>
          <StatsCard
            Icon={IconReceipt}
            isCurrencyValue={false}
            diff={12}
            title="Total Transactions"
            value={analytics?.data?.totalOrders || 0}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3, lg: 3 }}>
          <StatsCard
            Icon={IconChartBar}
            isCurrencyValue={true}
            diff={12}
            title="Avg Order Value"
            value={analytics?.data?.averageOrderValue || 0}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Paper shadow="xs" p="md">
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
            <h3
              className={classes.text__value}
            >{`₱${formatToTwoDecimals(totalSalesOverview || 0)}`}</h3>
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
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Paper shadow="xs" p="md">
            <h5 className={classes.chart__title}>Top 5 Most Ordered</h5>
            <BarChart
              mt="lg"
              h={285}
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
        </Grid.Col>
      </Grid>
    </main>
  );
};

export default Dashboard;
