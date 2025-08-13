
import Layout from '@/components/layout/Layout';

interface BasicPageProps {
  title: string;
  description?: string;
}

const BasicPage = ({ title, description }: BasicPageProps) => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {description || `${title} management and configuration`}
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-6 w-6 bg-primary/60 rounded"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground">
                The {title} section is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BasicPage;
