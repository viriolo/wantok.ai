
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, ExternalLink, MessageSquare } from "lucide-react";
import AIInsightsService, { AIInsight } from "@/services/AIInsightsService";

const AIInsights = () => {
  const aiInsightsService = AIInsightsService.getInstance();
  const [insights, setInsights] = React.useState<AIInsight[]>([]);

  React.useEffect(() => {
    // Get insights that require professional consultation
    const professionalInsights = aiInsightsService.getProfessionalConsultationInsights();
    setInsights(professionalInsights);
  }, []);

  const getComplexityBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge variant="destructive" className="ml-2">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive" className="ml-2">High Complexity</Badge>;
      case 'medium':
        return <Badge className="ml-2 bg-yellow-500">Medium Complexity</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Low Complexity</Badge>;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strategic_planning':
        return <div className="h-2 w-2 rounded-full bg-blue-500"></div>;
      case 'international_transaction':
        return <div className="h-2 w-2 rounded-full bg-purple-500"></div>;
      case 'business_decision':
        return <div className="h-2 w-2 rounded-full bg-green-500"></div>;
      case 'audit_representation':
        return <div className="h-2 w-2 rounded-full bg-red-500"></div>;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500"></div>;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Tax Insights</CardTitle>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length > 0 ? (
            <>
              <div className="text-sm font-medium text-yellow-500 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Professional consultation recommended
              </div>
              <div className="space-y-3">
                {insights.map((insight) => (
                  <div key={insight.id} className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <span className="font-medium text-sm">{insight.title}</span>
                        {getComplexityBadge(insight.complexityLevel)}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(insight.generatedDate)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    {insight.pngSpecificRegulations && (
                      <div className="text-xs mb-2">
                        <span className="font-medium">PNG Regulations: </span>
                        {insight.pngSpecificRegulations.join(', ')}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-2" /> Discuss with AI
                      </Button>
                      <Button size="sm" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-2" /> Get Professional Help
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <p className="text-sm font-medium">No professional consultation needed</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your current tax situation doesn't require expert consultation
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
