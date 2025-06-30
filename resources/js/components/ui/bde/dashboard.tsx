import { BarChart, LineChart, PieChart } from "@/components/charts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Postforums, Suject } from "@/types";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  LayoutGrid,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Activity,
  TrendingUp,
  PieChart as PieChartIcon
} from "lucide-react";

export default function Dashboard({ forums, posts }: { forums: Suject[], posts: Postforums[] }) {

  const totalForums = forums.length;
  const totalPosts = posts.length;
  const totalLikes = forums.reduce((sum, forum) => sum + forum.total_likes, 0) +
                     posts.reduce((sum, post) => sum + post.total_likes, 0);
  const totalUsers = [...new Set([
    ...forums.map(f => f.user.id),
    ...posts.map(p => p.user.id)
  ])].length;

  const forumActivityData = forums.map(forum => ({
    nom: forum.title,
    publications: forum.total_postforums,
    likes: forum.total_likes
  }));

  const categoryDistribution = forums.reduce((acc: Record<string, number>, forum) => {
    const category = forum.categoryforum.title;
    if (!acc[category]) acc[category] = 0;
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryDistribution).map(([name, value]) => ({
    name,
    value
  }));

  const postsOverTime = [...posts]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((post, index) => ({
      jour: index + 1,
      publications: index + 1,
      likes: post.total_likes
    }));

  return (
    <div className="p-4 md:p-6 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord des forums</h1>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Tableau de bord</span>
          <ChevronRight className="h-4 w-4" />
          <span>Analytiques</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Forums totaux"
          value={totalForums}
          icon={<LayoutGrid className="h-6 w-6" />}
          change={12}
        />
        <StatCard
          title="Publications totales"
          value={totalPosts}
          icon={<MessageSquare className="h-6 w-6" />}
          change={8}
        />
        <StatCard
          title="Likes totaux"
          value={totalLikes}
          icon={<ThumbsUp className="h-6 w-6" />}
          change={24}
        />
        <StatCard
          title="Utilisateurs uniques"
          value={totalUsers}
          icon={<Users className="h-6 w-6" />}
          change={5}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activité des forums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={forumActivityData}
              xAxis="nom"
              bars={[
                { key: "publications", color: "#3b82f6", name: "Publications" },
                { key: "likes", color: "#10b981", name: "Likes" }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Répartition par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PieChart data={categoryData} />
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Publications dans le temps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={postsOverTime}
              xAxis="jour"
              lines={[
                { key: "publications", color: "#3b82f6", name: "Publications" },
                { key: "likes", color: "#10b981", name: "Likes" }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forums les plus engagés</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Forum</TableHead>
                  <TableHead>Publications</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forums
                  .sort((a, b) => b.total_postforums - a.total_postforums)
                  .slice(0, 5)
                  .map((forum) => (
                    <TableRow key={forum.id}>
                      <TableCell className="font-medium">{forum.title}</TableCell>
                      <TableCell>{forum.total_postforums}</TableCell>
                      <TableCell>{forum.total_likes}</TableCell>
                      <TableCell className="text-right">
                        {Math.round((forum.total_postforums + forum.total_likes) / totalUsers * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Publications récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contenu</TableHead>
                  <TableHead>Forum</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.slice(0, 5).map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{post.content}</TableCell>
                    <TableCell>{post.forum.title}</TableCell>
                    <TableCell>{post.user.name}</TableCell>
                    <TableCell>{post.total_likes}</TableCell>
                    <TableCell className="text-right">
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon, change }: { title: string, value: number, icon: React.ReactNode, change: number }) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs mt-1 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 mr-1" />
          )}
          {Math.abs(change)}% {isPositive ? 'hausse' : 'baisse'} par rapport au mois dernier
        </p>
      </CardContent>
    </Card>
  );
}
