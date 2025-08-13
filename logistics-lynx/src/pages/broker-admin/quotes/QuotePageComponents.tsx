import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Filter, Download, Plus, Edit, Trash2, Eye, Clock, 
  TrendingUp, Target, DollarSign, Users, AlertCircle, CheckCircle,
  XCircle, Bell, Settings, Zap, Bot, BarChart3, Activity, Mail,
  Calculator, Brain, LineChart, Workflow, RefreshCw, Copy, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// =================== QUOTE MANAGEMENT PAGES ===================

export const PendingQuotesPage = () => {
  const { toast } = useToast();
  
  const pendingQuotes = [
    { id: "QT-2024-156", customer: "Walmart Distribution", route: "Los Angeles, CA → Phoenix, AZ", amount: 2850, priority: "High", daysActive: 2, expiryDays: 5 },
    { id: "QT-2024-157", customer: "Amazon Logistics", route: "Chicago, IL → Dallas, TX", amount: 3200, priority: "Medium", daysActive: 1, expiryDays: 7 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pending Quotes</h1>
          <p className="text-muted-foreground">Manage quotes awaiting customer response</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />New Quote</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Pending</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Expiring Soon</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2.3h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Follow-ups Sent</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">47</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Pending Quotes</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell>{quote.route}</TableCell>
                  <TableCell>${quote.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge variant="outline">{quote.priority}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline"><Send className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const WonQuotesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Won Quotes</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>Total Won</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">147</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$418,950</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Avg Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">22.5%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Win Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68%</div></CardContent></Card>
    </div>
  </div>
);

export const LostQuotesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Lost Quotes</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Total Lost</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">32</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Top Loss Reason</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">Price Too High</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Potential Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$89,400</div></CardContent></Card>
    </div>
  </div>
);

export const ExpiredQuotesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Expired Quotes</h1>
    <div className="flex gap-2 mb-6">
      <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4" />Renew Selected</Button>
    </div>
  </div>
);

export const DraftQuotesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Draft Quotes</h1>
    <p className="text-muted-foreground">Incomplete quotes saved for later</p>
  </div>
);

// =================== SMART PRICING PAGES ===================

export const AIQuoteGeneratorPage = () => {
  const [generating, setGenerating] = useState(false);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Quote Generator</h1>
          <p className="text-muted-foreground">Generate intelligent quotes using AI and market data</p>
        </div>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Quote Parameters</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Origin</Label><Input placeholder="Los Angeles, CA" /></div>
              <div><Label>Destination</Label><Input placeholder="Phoenix, AZ" /></div>
            </div>
            <Button className="w-full" disabled={generating}>
              {generating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
              Generate AI Quote
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>AI Analysis</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                <span>Recommended Price</span>
                <span className="text-xl font-bold text-blue-600">$2,850</span>
              </div>
              <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                <span>Confidence Score</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteMarketIntelPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Market Intelligence</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>Market Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$2.85/mi</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Fuel Index</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$3.42</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Capacity</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Demand Index</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">92</div></CardContent></Card>
    </div>
  </div>
);

export const CompetitiveAnalysisPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Competitive Analysis</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Market Position</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">#3</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Price Position</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+8%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Win Rate vs Competitors</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68%</div></CardContent></Card>
    </div>
  </div>
);

export const RateCalculatorPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Rate Calculator</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Rate Parameters</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Distance (miles)</Label><Input type="number" placeholder="1000" /></div>
            <div><Label>Base Rate ($/mile)</Label><Input type="number" placeholder="2.50" /></div>
          </div>
          <Button className="w-full"><Calculator className="mr-2 h-4 w-4" />Calculate Rate</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Simplified versions of remaining components for efficiency
export const MarginOptimizerPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Margin Optimizer</h1></div>;
export const DynamicPricingPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Dynamic Pricing</h1></div>;

// =================== TEMPLATES & AUTOMATION ===================

export const AutoQuoteRulesPage = () => {
  const [rules, setRules] = useState([
    { id: 1, name: "High Priority Customer Auto-Approval", condition: "Customer Tier = Premium AND Amount < $5000", action: "Auto-approve", status: "Active" },
    { id: 2, name: "Lane-Based Pricing", condition: "Route = CA to TX", action: "Apply 15% markup", status: "Active" }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Auto Quote Rules</h1>
          <p className="text-muted-foreground">Automate quote generation and approval processes</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Create Rule</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Rules</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{rules.length}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Auto-Approved Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">47</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Rules Triggered</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">124</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">94%</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quote Rules</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell><Badge variant="outline">{rule.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const ApprovalWorkflowsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Approval Workflows</h1>
          <p className="text-muted-foreground">Configure multi-step approval processes</p>
        </div>
        <Button><Workflow className="mr-2 h-4 w-4" />Create Workflow</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle>Active Workflows</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Pending Approvals</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">23</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Processing Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.2h</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Workflow Builder</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Workflow Name</Label><Input placeholder="High Value Quote Approval" /></div>
            <div><Label>Trigger Condition</Label><Select><SelectTrigger><SelectValue placeholder="Quote Amount > $10,000" /></SelectTrigger></Select></div>
            <div><Label>Approval Steps</Label><Textarea placeholder="1. Sales Manager Review&#10;2. Operations Director Approval&#10;3. Final Authorization" /></div>
            <Button className="w-full"><Workflow className="mr-2 h-4 w-4" />Save Workflow</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Current Approvals</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { quote: "QT-2024-189", customer: "Walmart", amount: "$15,400", step: "Manager Review", time: "2h ago" },
                { quote: "QT-2024-190", customer: "Amazon", amount: "$22,100", step: "Director Approval", time: "5h ago" }
              ].map((approval, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{approval.quote}</div>
                    <div className="text-sm text-muted-foreground">{approval.customer} • {approval.amount}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{approval.step}</div>
                    <div className="text-xs text-muted-foreground">{approval.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const EmailTemplatesPage = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Quote Follow-up", type: "Follow-up", subject: "Following up on your quote request", status: "Active" },
    { id: 2, name: "Quote Acceptance", type: "Confirmation", subject: "Thank you for accepting our quote", status: "Active" },
    { id: 3, name: "Quote Expiration Reminder", type: "Reminder", subject: "Your quote expires soon", status: "Active" }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Manage automated email communications</p>
        </div>
        <Button><Mail className="mr-2 h-4 w-4" />Create Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Total Templates</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{templates.length}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Emails Sent Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Open Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Response Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24%</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Email Templates</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">{template.type} • {template.subject}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline"><Copy className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Template Editor</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Template Name</Label><Input placeholder="New Quote Follow-up" /></div>
            <div><Label>Email Subject</Label><Input placeholder="Following up on your quote request" /></div>
            <div><Label>Email Body</Label><Textarea rows={8} placeholder="Dear {{customer_name}},&#10;&#10;Thank you for your interest in our services..." /></div>
            <Button className="w-full"><Mail className="mr-2 h-4 w-4" />Save Template</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteTriggersPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Triggers</h1>
          <p className="text-muted-foreground">Automated actions based on quote events</p>
        </div>
        <Button><Zap className="mr-2 h-4 w-4" />Create Trigger</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Triggers</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Triggered Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">92%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">1.2s</div></CardContent></Card>
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList>
          <TabsTrigger value="events">Event Triggers</TabsTrigger>
          <TabsTrigger value="time">Time-based Triggers</TabsTrigger>
          <TabsTrigger value="conditions">Conditional Triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Event-based Triggers</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { event: "Quote Created", action: "Send confirmation email", status: "Active" },
                  { event: "Quote Accepted", action: "Create load and notify dispatch", status: "Active" },
                  { event: "Quote Rejected", action: "Add to follow-up campaign", status: "Active" }
                ].map((trigger, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{trigger.event}</div>
                      <div className="text-sm text-muted-foreground">{trigger.action}</div>
                    </div>
                    <Badge variant="outline">{trigger.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// =================== CUSTOMER & RATES ===================

export const CustomerRatesPage = () => {
  const [customerRates, setCustomerRates] = useState([
    { id: 1, customer: "Walmart Distribution", lane: "CA → TX", baseRate: 2.85, markup: "15%", finalRate: 3.28, effectiveDate: "2024-01-15", status: "Active" },
    { id: 2, customer: "Amazon Logistics", lane: "NY → FL", baseRate: 2.65, markup: "18%", finalRate: 3.13, effectiveDate: "2024-01-10", status: "Active" },
    { id: 3, customer: "Target Corp", lane: "IL → CA", baseRate: 2.95, markup: "12%", finalRate: 3.30, effectiveDate: "2024-01-20", status: "Pending" }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Rates</h1>
          <p className="text-muted-foreground">Manage customer-specific pricing and rate agreements</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Add Customer Rate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Agreements</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Markup</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">15.2%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Top Customer</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">Walmart</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Revenue Impact</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$2.4M</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Customer Rate Agreements</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Lane</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Markup</TableHead>
                <TableHead>Final Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.customer}</TableCell>
                  <TableCell>{rate.lane}</TableCell>
                  <TableCell>${rate.baseRate}/mi</TableCell>
                  <TableCell>{rate.markup}</TableCell>
                  <TableCell>${rate.finalRate}/mi</TableCell>
                  <TableCell><Badge variant="outline">{rate.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const CustomerHistoryPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer History</h1>
          <p className="text-muted-foreground">Track customer quoting and booking patterns</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search customers..." className="w-64" />
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card><CardHeader><CardTitle>Total Customers</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">847</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Active This Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Quote Value</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$3,240</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Repeat Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Customer LTV</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$24,500</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Top Customers by Volume</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Walmart Distribution", quotes: 45, revenue: "$142,500", trend: "+12%" },
                { name: "Amazon Logistics", quotes: 38, revenue: "$118,700", trend: "+8%" },
                { name: "Target Corporation", quotes: 29, revenue: "$89,200", trend: "+15%" }
              ].map((customer, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.quotes} quotes • {customer.revenue}</div>
                  </div>
                  <Badge variant="outline" className="text-green-600">{customer.trend}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { customer: "Walmart", action: "Quote QT-2024-245 accepted", time: "2h ago", value: "$4,200" },
                { customer: "Amazon", action: "New quote request received", time: "4h ago", value: "$3,800" },
                { customer: "Target", action: "Quote QT-2024-243 expired", time: "6h ago", value: "$2,950" }
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-start p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{activity.customer}</div>
                    <div className="text-sm text-muted-foreground">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <div className="text-sm font-medium">{activity.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const RateTablesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rate Tables</h1>
          <p className="text-muted-foreground">Manage standardized rate matrices and pricing tables</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Create Rate Table</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Tables</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Rate Points</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2,847</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Last Updated</CardTitle></CardHeader><CardContent><div className="text-sm font-bold">2h ago</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Coverage</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">94%</div></CardContent></Card>
      </div>

      <Tabs defaultValue="standard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="standard">Standard Rates</TabsTrigger>
          <TabsTrigger value="customer">Customer Specific</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Standard Rate Matrix</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Miles</TableHead>
                      <TableHead>Base Rate</TableHead>
                      <TableHead>Fuel Surcharge</TableHead>
                      <TableHead>Total Rate</TableHead>
                      <TableHead>Effective Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { origin: "Los Angeles, CA", destination: "Phoenix, AZ", miles: 370, base: 2.85, fuel: 0.42, total: 3.27, effective: "2024-01-15" },
                      { origin: "Chicago, IL", destination: "Dallas, TX", miles: 925, base: 2.65, fuel: 0.38, total: 3.03, effective: "2024-01-15" },
                      { origin: "New York, NY", destination: "Atlanta, GA", miles: 875, base: 2.75, fuel: 0.40, total: 3.15, effective: "2024-01-15" }
                    ].map((rate, i) => (
                      <TableRow key={i}>
                        <TableCell>{rate.origin}</TableCell>
                        <TableCell>{rate.destination}</TableCell>
                        <TableCell>{rate.miles}</TableCell>
                        <TableCell>${rate.base}</TableCell>
                        <TableCell>${rate.fuel}</TableCell>
                        <TableCell className="font-medium">${rate.total}</TableCell>
                        <TableCell>{rate.effective}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const QuoteCarrierRatesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Carrier Rates</h1>
          <p className="text-muted-foreground">Monitor carrier pricing and capacity</p>
        </div>
        <Button><RefreshCw className="mr-2 h-4 w-4" />Refresh Rates</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Carriers</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Carrier Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$2.38/mi</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Best Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">28%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Available Capacity</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Carrier Rate Comparison</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carrier</TableHead>
                <TableHead>Lane</TableHead>
                <TableHead>Rate Offered</TableHead>
                <TableHead>Our Quote</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { carrier: "Swift Transportation", lane: "CA → TX", rate: 2200, quote: 2850, margin: "29.5%", capacity: "Available", rating: 4.8 },
                { carrier: "JB Hunt", lane: "NY → FL", rate: 1950, quote: 2650, margin: "35.9%", capacity: "Limited", rating: 4.6 },
                { carrier: "Schneider", lane: "IL → CA", rate: 2400, quote: 3100, margin: "29.2%", capacity: "Available", rating: 4.7 }
              ].map((carrier, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{carrier.carrier}</TableCell>
                  <TableCell>{carrier.lane}</TableCell>
                  <TableCell>${carrier.rate}</TableCell>
                  <TableCell>${carrier.quote}</TableCell>
                  <TableCell className="text-green-600 font-medium">{carrier.margin}</TableCell>
                  <TableCell><Badge variant="outline">{carrier.capacity}</Badge></TableCell>
                  <TableCell>{carrier.rating} ⭐</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const LanePricingPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lane Pricing</h1>
          <p className="text-muted-foreground">Analyze and optimize pricing by shipping lanes</p>
        </div>
        <Button><BarChart3 className="mr-2 h-4 w-4" />Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card><CardHeader><CardTitle>Active Lanes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">247</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Top Performing</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">CA → TX</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24.5%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Volume Leader</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">NY → FL</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Opportunity</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">IL → WA</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Top Performing Lanes</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { lane: "Los Angeles, CA → Dallas, TX", volume: 45, revenue: "$156,400", margin: "28.5%" },
                { lane: "Chicago, IL → Atlanta, GA", volume: 38, revenue: "$142,200", margin: "26.8%" },
                { lane: "New York, NY → Miami, FL", volume: 35, revenue: "$134,800", margin: "25.2%" }
              ].map((lane, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{lane.lane}</div>
                    <div className="text-sm text-muted-foreground">{lane.volume} loads • {lane.revenue}</div>
                  </div>
                  <Badge variant="outline" className="text-green-600">{lane.margin}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pricing Opportunities</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { lane: "Seattle, WA → Portland, OR", current: "$2.45", potential: "$2.85", opportunity: "+16%" },
                { lane: "Houston, TX → New Orleans, LA", current: "$2.20", potential: "$2.65", opportunity: "+20%" },
                { lane: "Denver, CO → Salt Lake City, UT", current: "$2.65", potential: "$3.10", opportunity: "+17%" }
              ].map((opp, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="font-medium">{opp.lane}</div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Current: {opp.current}</span>
                    <span>Potential: {opp.potential}</span>
                    <span className="text-green-600 font-medium">{opp.opportunity}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteFuelSurchargesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fuel Surcharges</h1>
          <p className="text-muted-foreground">Manage dynamic fuel surcharge calculations</p>
        </div>
        <Button><RefreshCw className="mr-2 h-4 w-4" />Update Rates</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Current Fuel Price</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$3.42</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Base Surcharge</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">14.5%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Weekly Change</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+$0.08</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Impact on Quotes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+$127</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Fuel Surcharge Calculator</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Base Fuel Price</Label><Input type="number" placeholder="3.42" /></div>
            <div><Label>Current Fuel Price</Label><Input type="number" placeholder="3.58" /></div>
            <div><Label>Surcharge Percentage</Label><Input type="number" placeholder="14.5" /></div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between">
                <span>Calculated Surcharge:</span>
                <span className="font-bold text-blue-600">$0.48/mile</span>
              </div>
            </div>
            <Button className="w-full"><Calculator className="mr-2 h-4 w-4" />Apply to All Quotes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Fuel Price Trends</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { week: "Week 1", price: "$3.34", change: "-$0.04", surcharge: "13.8%" },
                { week: "Week 2", price: "$3.42", change: "+$0.08", surcharge: "14.5%" },
                { week: "Week 3", price: "$3.58", change: "+$0.16", surcharge: "15.8%" },
                { week: "Week 4", price: "$3.51", change: "-$0.07", surcharge: "15.2%" }
              ].map((trend, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{trend.week}</div>
                    <div className="text-sm text-muted-foreground">{trend.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{trend.surcharge}</div>
                    <div className={`text-xs ${trend.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>{trend.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =================== ANALYTICS & REPORTS ===================

export const QuotePerformancePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Performance</h1>
          <p className="text-muted-foreground">Track quote metrics and performance indicators</p>
        </div>
        <Button><BarChart3 className="mr-2 h-4 w-4" />Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card><CardHeader><CardTitle>Total Quotes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2,847</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Win Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2.4h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Conversion Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Revenue Generated</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$8.4M</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Performance Trends</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Quote Volume</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-24" />
                  <span className="text-sm font-medium">+15%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Win Rate</span>
                <div className="flex items-center gap-2">
                  <Progress value={68} className="w-24" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-24" />
                  <span className="text-sm font-medium">-12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Performing Sales Reps</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", quotes: 89, won: 67, rate: "75%" },
                { name: "Mike Chen", quotes: 76, won: 54, rate: "71%" },
                { name: "Emily Davis", quotes: 82, won: 55, rate: "67%" }
              ].map((rep, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{rep.name}</div>
                    <div className="text-sm text-muted-foreground">{rep.quotes} quotes • {rep.won} won</div>
                  </div>
                  <Badge variant="outline" className="text-green-600">{rep.rate}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const WinRateAnalysisPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Win Rate Analysis</h1>
          <p className="text-muted-foreground">Analyze quote win rates by various dimensions</p>
        </div>
        <Button><TrendingUp className="mr-2 h-4 w-4" />Analyze Trends</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Overall Win Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">68.5%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>This Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">71.2%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Last Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">65.8%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>YoY Change</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">+12%</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Win Rate by Customer Segment</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { segment: "Enterprise", rate: 78, quotes: 145 },
                { segment: "Mid-Market", rate: 65, quotes: 298 },
                { segment: "Small Business", rate: 58, quotes: 156 }
              ].map((segment, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <span className="text-sm">{segment.rate}% ({segment.quotes} quotes)</span>
                  </div>
                  <Progress value={segment.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Win Rate by Lane</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { lane: "CA → TX", rate: 85, quotes: 67 },
                { lane: "NY → FL", rate: 72, quotes: 89 },
                { lane: "IL → GA", rate: 68, quotes: 54 }
              ].map((lane, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{lane.lane}</span>
                    <span className="text-sm">{lane.rate}% ({lane.quotes} quotes)</span>
                  </div>
                  <Progress value={lane.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteRevenueForecastPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue Forecast</h1>
          <p className="text-muted-foreground">Predict future revenue based on quote pipeline</p>
        </div>
        <Button><LineChart className="mr-2 h-4 w-4" />Update Forecast</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Q1 Forecast</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$2.8M</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Pipeline Value</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$1.2M</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Confidence Level</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">87%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Upside Potential</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">+$450K</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Forecast</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: "January", forecast: "$920K", actual: "$885K", variance: "-3.8%" },
                { month: "February", forecast: "$950K", actual: "-", variance: "-" },
                { month: "March", forecast: "$1.1M", actual: "-", variance: "-" }
              ].map((month, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{month.month}</div>
                    <div className="text-sm text-muted-foreground">Forecast: {month.forecast}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{month.actual}</div>
                    <div className={`text-xs ${month.variance.startsWith('-') && month.variance !== '-' ? 'text-red-600' : 'text-green-600'}`}>{month.variance}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Forecast Drivers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Existing Pipeline</span>
                <span className="font-medium">$750K (67%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>New Opportunities</span>
                <span className="font-medium">$280K (25%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Renewal/Repeat</span>
                <span className="font-medium">$90K (8%)</span>
              </div>
              <Progress value={100} className="mt-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteMarginAnalysisPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Margin Analysis</h1>
          <p className="text-muted-foreground">Analyze profit margins across quotes and customers</p>
        </div>
        <Button><Target className="mr-2 h-4 w-4" />Optimize Margins</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Average Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24.5%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Best Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">38.2%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Target Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">25.0%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Margin Trend</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">+2.1%</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Margin Analysis by Quote</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Quote Amount</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Margin %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "QT-2024-245", customer: "Walmart", quote: 4200, cost: 3150, margin: 1050, percent: "25.0%", status: "Won" },
                { id: "QT-2024-246", customer: "Amazon", quote: 3800, cost: 2850, margin: 950, percent: "25.0%", status: "Pending" },
                { id: "QT-2024-247", customer: "Target", quote: 2950, cost: 2200, margin: 750, percent: "25.4%", status: "Lost" }
              ].map((quote, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell>${quote.quote.toLocaleString()}</TableCell>
                  <TableCell>${quote.cost.toLocaleString()}</TableCell>
                  <TableCell>${quote.margin.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{quote.percent}</TableCell>
                  <TableCell><Badge variant="outline">{quote.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const ResponseTimeAnalysisPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Response Time Analysis</h1>
          <p className="text-muted-foreground">Track and optimize quote response times</p>
        </div>
        <Button><Clock className="mr-2 h-4 w-4" />Set Targets</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Avg Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2.4h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Target Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2.0h</div></CardContent></Card>
        <Card><CardHeader><CardTitle>On-Time Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Fastest Response</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">15m</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Response Time Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { range: "< 1 hour", count: 45, percentage: 32 },
                { range: "1-2 hours", count: 38, percentage: 27 },
                { range: "2-4 hours", count: 29, percentage: 21 },
                { range: "> 4 hours", count: 28, percentage: 20 }
              ].map((range, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{range.range}</span>
                    <span className="text-sm">{range.count} quotes ({range.percentage}%)</span>
                  </div>
                  <Progress value={range.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Response Time by Rep</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rep: "Sarah Johnson", avgTime: "1.8h", onTime: "89%" },
                { rep: "Mike Chen", avgTime: "2.1h", onTime: "82%" },
                { rep: "Emily Davis", avgTime: "2.6h", onTime: "74%" }
              ].map((rep, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{rep.rep}</div>
                    <div className="text-sm text-muted-foreground">Avg: {rep.avgTime}</div>
                  </div>
                  <Badge variant="outline" className="text-green-600">{rep.onTime}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ConversionFunnelPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Conversion Funnel</h1>
          <p className="text-muted-foreground">Track quote progression through the sales funnel</p>
        </div>
        <Button><Activity className="mr-2 h-4 w-4" />Analyze Funnel</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card><CardHeader><CardTitle>Inquiries</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">1,250</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Quotes Sent</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">987</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Follow-ups</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">456</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Negotiations</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">234</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Won</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Conversion Rates</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Inquiry to Quote</span>
                <div className="flex items-center gap-2">
                  <Progress value={79} className="w-24" />
                  <span className="text-sm font-medium">79%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Quote to Follow-up</span>
                <div className="flex items-center gap-2">
                  <Progress value={46} className="w-24" />
                  <span className="text-sm font-medium">46%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Follow-up to Negotiation</span>
                <div className="flex items-center gap-2">
                  <Progress value={51} className="w-24" />
                  <span className="text-sm font-medium">51%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Negotiation to Close</span>
                <div className="flex items-center gap-2">
                  <Progress value={67} className="w-24" />
                  <span className="text-sm font-medium">67%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Funnel Bottlenecks</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { stage: "Quote Response Time", issue: "Average 2.4h response time", impact: "High", action: "Automate initial quotes" },
                { stage: "Follow-up Process", issue: "46% follow-up rate", impact: "Medium", action: "Set automated reminders" },
                { stage: "Pricing Competitiveness", issue: "Lost 32% due to price", impact: "High", action: "Market rate analysis" }
              ].map((bottleneck, i) => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{bottleneck.stage}</div>
                    <Badge variant="outline" className={bottleneck.impact === 'High' ? 'text-red-600' : 'text-yellow-600'}>{bottleneck.impact}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{bottleneck.issue}</div>
                  <div className="text-sm font-medium text-blue-600">{bottleneck.action}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =================== COMMUNICATION ===================

export const QuoteNotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Quote Accepted", customer: "Walmart", quote: "QT-2024-245", time: "2h ago", read: false },
    { id: 2, type: "Quote Expired", customer: "Amazon", quote: "QT-2024-243", time: "5h ago", read: false },
    { id: 3, type: "Follow-up Due", customer: "Target", quote: "QT-2024-241", time: "1d ago", read: true }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Notifications</h1>
          <p className="text-muted-foreground">Manage quote-related alerts and notifications</p>
        </div>
        <Button><Bell className="mr-2 h-4 w-4" />Notification Settings</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Unread Alerts</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">7</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Today's Notifications</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">23</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Critical Alerts</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">3</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Auto Actions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Recent Notifications</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className={`flex justify-between items-start p-3 border rounded-lg ${!notif.read ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <div>
                    <div className="font-medium">{notif.type}</div>
                    <div className="text-sm text-muted-foreground">{notif.customer} • {notif.quote}</div>
                    <div className="text-xs text-muted-foreground">{notif.time}</div>
                  </div>
                  <div className="flex gap-2">
                    {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                    <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Quote Responses</div>
                <div className="text-sm text-muted-foreground">Get notified when customers respond</div>
              </div>
              <Switch />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Expiration Alerts</div>
                <div className="text-sm text-muted-foreground">24h before quote expires</div>
              </div>
              <Switch />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Follow-up Reminders</div>
                <div className="text-sm text-muted-foreground">Automated follow-up scheduling</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const CustomerPortalPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Portal</h1>
          <p className="text-muted-foreground">Self-service portal for customer quote management</p>
        </div>
        <Button><Users className="mr-2 h-4 w-4" />Portal Settings</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Portals</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Login Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">67%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Self-Service Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">45%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Satisfaction</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.6⭐</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Portal Features</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Quote Requests</div>
                <div className="text-sm text-muted-foreground">Allow customers to request quotes</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Quote History</div>
                <div className="text-sm text-muted-foreground">View past quotes and orders</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Real-time Tracking</div>
                <div className="text-sm text-muted-foreground">Track shipment status</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Document Access</div>
                <div className="text-sm text-muted-foreground">Download BOL, invoices, etc.</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Portal Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { customer: "Walmart", action: "Quote request submitted", time: "1h ago" },
                { customer: "Amazon", action: "Invoice downloaded", time: "3h ago" },
                { customer: "Target", action: "Shipment tracking viewed", time: "5h ago" }
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-start p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{activity.customer}</div>
                    <div className="text-sm text-muted-foreground">{activity.action}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const QuoteTrackingPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Tracking</h1>
          <p className="text-muted-foreground">Track quote status and customer interactions</p>
        </div>
        <Button><Activity className="mr-2 h-4 w-4" />Track New Quote</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Quotes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Viewed Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">47</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Pending Response</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">23</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Avg View Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">3.2m</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quote Tracking Status</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Viewed</TableHead>
                <TableHead>View Count</TableHead>
                <TableHead>Customer Action</TableHead>
                <TableHead>Next Step</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "QT-2024-245", customer: "Walmart", status: "Viewed", lastViewed: "2h ago", views: 3, action: "Downloaded", next: "Follow up" },
                { id: "QT-2024-246", customer: "Amazon", status: "Sent", lastViewed: "5h ago", views: 1, action: "Opened", next: "Wait" },
                { id: "QT-2024-247", customer: "Target", status: "Pending", lastViewed: "Never", views: 0, action: "None", next: "Reminder" }
              ].map((quote, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell><Badge variant="outline">{quote.status}</Badge></TableCell>
                  <TableCell>{quote.lastViewed}</TableCell>
                  <TableCell>{quote.views}</TableCell>
                  <TableCell>{quote.action}</TableCell>
                  <TableCell><Badge variant="outline">{quote.next}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const FollowupManagerPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Follow-up Manager</h1>
          <p className="text-muted-foreground">Automated and manual follow-up campaigns</p>
        </div>
        <Button><Mail className="mr-2 h-4 w-4" />Create Campaign</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Due Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Response Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">34%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Conversion Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">18%</div></CardContent></Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Follow-ups</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Pending Follow-ups</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { quote: "QT-2024-245", customer: "Walmart", type: "2nd Follow-up", due: "Today 3:00 PM", priority: "High" },
                  { quote: "QT-2024-246", customer: "Amazon", type: "1st Follow-up", due: "Tomorrow 10:00 AM", priority: "Medium" },
                  { quote: "QT-2024-247", customer: "Target", type: "Final Follow-up", due: "Tomorrow 2:00 PM", priority: "High" }
                ].map((followup, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{followup.customer}</div>
                      <div className="text-sm text-muted-foreground">{followup.quote} • {followup.type}</div>
                      <div className="text-xs text-muted-foreground">{followup.due}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={followup.priority === 'High' ? 'text-red-600' : 'text-yellow-600'}>{followup.priority}</Badge>
                      <Button size="sm" variant="outline"><Send className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const QuoteChatPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Chat</h1>
          <p className="text-muted-foreground">Real-time communication with customers about quotes</p>
        </div>
        <Button><Bell className="mr-2 h-4 w-4" />Chat Settings</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Active Chats</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12m</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Resolution Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">89%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Satisfaction</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.7⭐</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Active Conversations</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { customer: "Walmart", message: "Can you adjust the delivery date?", time: "5m ago", unread: 2 },
                { customer: "Amazon", message: "Quote looks good, processing...", time: "15m ago", unread: 0 },
                { customer: "Target", message: "Need pricing for additional stops", time: "1h ago", unread: 1 }
              ].map((chat, i) => (
                <div key={i} className="flex justify-between items-start p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{chat.customer}</div>
                    <div className="text-sm text-muted-foreground truncate">{chat.message}</div>
                    <div className="text-xs text-muted-foreground">{chat.time}</div>
                  </div>
                  {chat.unread > 0 && (
                    <Badge variant="destructive" className="ml-2">{chat.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader><CardTitle>Chat Interface</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80 border rounded-lg p-4 bg-gray-50 mb-4">
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="bg-blue-100 p-2 rounded-lg max-w-xs">
                    <div className="text-sm">Can you provide a quote for CA to TX?</div>
                    <div className="text-xs text-gray-500">Walmart • 2h ago</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-2 rounded-lg max-w-xs">
                    <div className="text-sm">Absolutely! I'll prepare that for you right away.</div>
                    <div className="text-xs text-blue-200">You • 2h ago</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-2 rounded-lg max-w-xs">
                    <div className="text-sm">Quote QT-2024-245 sent: $2,850 for 1,200 miles</div>
                    <div className="text-xs text-blue-200">You • 1h ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button><Send className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =================== INTEGRATION & API ===================

export const LoadBoardIntegrationPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Load Board Integration</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>Connected Boards</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Auto-Quote Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">67%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Loads Quoted</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">247</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Win Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">34%</div></CardContent></Card>
    </div>
  </div>
);

export const TMSIntegrationPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">TMS Integration</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Connected Systems</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Sync Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">98%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Last Sync</CardTitle></CardHeader><CardContent><div className="text-sm font-bold">2m ago</div></CardContent></Card>
    </div>
  </div>
);

export const CRMSyncPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">CRM Sync</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>Synced Customers</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">1,247</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Quote Sync Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">94%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Data Accuracy</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">97%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Last Update</CardTitle></CardHeader><CardContent><div className="text-sm font-bold">5m ago</div></CardContent></Card>
    </div>
  </div>
);

export const QuoteAPIEndpointsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">API Endpoints</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>API Calls Today</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2,847</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">99.8%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Avg Response</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">245ms</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Rate Limit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">85%</div></CardContent></Card>
    </div>
  </div>
);

export const EDIQuotesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">EDI Quotes</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>EDI Partners</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Auto Quotes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">156</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Success Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">96%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Processing Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2.1s</div></CardContent></Card>
    </div>
  </div>
);

export const ThirdPartyToolsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Third Party Tools</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Connected Tools</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Integration Health</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">98%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Data Flow</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">Active</div></CardContent></Card>
    </div>
  </div>
);

// =================== SETTINGS & CONFIGURATION ===================

export const QuoteGeneralSettingsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">General Settings</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Quote Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Default Quote Validity (days)</Label><Input type="number" defaultValue="7" /></div>
          <div><Label>Auto-Follow-up Interval (hours)</Label><Input type="number" defaultValue="24" /></div>
          <div><Label>Quote Numbering Format</Label><Input defaultValue="QT-YYYY-###" /></div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export const ApprovalLimitsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Approval Limits</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Standard Limit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$5,000</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Manager Limit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$25,000</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Director Limit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$100,000</div></CardContent></Card>
    </div>
  </div>
);

export const PricingRulesPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Pricing Rules</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>Active Rules</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">18</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Min Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">15%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Target Margin</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">25%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Max Discount</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">10%</div></CardContent></Card>
    </div>
  </div>
);

export const QuotePermissionsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Quote Permissions</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>User Roles</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Permission Sets</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Active Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">47</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Admin Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5</div></CardContent></Card>
    </div>
  </div>
);

export const QuoteFormatsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Quote Formats</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader><CardTitle>Active Templates</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">6</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Default Format</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">Standard</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Custom Fields</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div></CardContent></Card>
    </div>
  </div>
);

export const QuoteSystemConfigPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">System Configuration</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card><CardHeader><CardTitle>System Status</CardTitle></CardHeader><CardContent><div className="text-lg font-bold text-green-600">Online</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Uptime</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">99.9%</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Performance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">Optimal</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Last Backup</CardTitle></CardHeader><CardContent><div className="text-sm font-bold">2h ago</div></CardContent></Card>
    </div>
  </div>
);

// Bulk Operations
export const BulkQuoteCreatorPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Bulk Quote Creator</h1></div>;
export const MassUpdatesPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Mass Updates</h1></div>;
export const ExportManagerPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Export Manager</h1></div>;
export const ImportQuotesPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Import Quotes</h1></div>;
export const BatchProcessingPage = () => <div className="p-6"><h1 className="text-3xl font-bold">Batch Processing</h1></div>;