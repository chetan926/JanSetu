import React, { useState } from 'react';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Bot, CheckCircle2 } from 'lucide-react';
import { aiAssistantApi } from '@/services/api';
import { toast } from 'sonner';

interface AiAssistantWidgetProps {
  onStartApplication?: () => void;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ onStartApplication }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await aiAssistantApi(query);
      setRecommendation(data);
      toast.success('AI Intent Classification complete');
    } catch (err) {
      toast.error('Failed to contact AI service assistant');
    } finally {
      setLoading(false);
    }
  };

  const setSampleQuery = (text: string) => {
    setQuery(text);
  };

  return (
    <GlassCard className="p-6 border-amber-200 bg-white/95">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002D62] text-white shadow-md">
            <Bot className="h-5 w-5 text-[#FF9933]" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#0F172A] text-base">JanSetu AI Service Assistant</h3>
            <p className="text-[11px] text-slate-500">Ask in English, Hindi, or Telugu</p>
          </div>
        </div>
        <Badge variant="gold" className="text-[10px]">
          <Sparkles className="h-3 w-3 mr-1 text-[#FF9933]" /> Multi-lingual Intent AI
        </Badge>
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSampleQuery("I need financial assistance for my college daughter's education.")}
          className="text-[11px] bg-slate-100 border border-slate-200 hover:border-amber-400 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors"
        >
          "Financial aid for college education"
        </button>
        <button
          onClick={() => setSampleQuery("నా కూతురి చదువుకు ఆర్థిక సహాయం కావాలి")}
          className="text-[11px] bg-slate-100 border border-slate-200 hover:border-amber-400 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors font-sans"
        >
          "నా కూతురి చదువుకు ఆర్థిక సహాయం" (Telugu)
        </button>
        <button
          onClick={() => setSampleQuery("छात्रवृत्ति योजना की जानकारी चाहिए")}
          className="text-[11px] bg-slate-100 border border-slate-200 hover:border-amber-400 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors font-sans"
        >
          "छात्रवृत्ति योजना की जानकारी" (Hindi)
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAsk} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tell me what service or aid you are looking for..."
          className="bg-white border-slate-300 focus:border-[#FF9933]"
        />
        <Button type="submit" disabled={loading} className="bg-[#002D62] text-white hover:bg-[#0F172A] shrink-0 font-bold">
          {loading ? 'Analyzing...' : <Send className="h-4 w-4 text-[#FF9933]" />}
        </Button>
      </form>

      {/* Recommendation Result Card */}
      {recommendation && (
        <div className="mt-5 p-5 rounded-2xl bg-amber-50/60 border border-amber-300 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#002D62] font-bold uppercase tracking-wider">
              {recommendation.intent}
            </span>
            <Badge variant="success">{(recommendation.confidence * 100).toFixed(0)}% Match Confidence</Badge>
          </div>

          <h4 className="text-lg font-extrabold text-[#0F172A]">{recommendation.recommended_service}</h4>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{recommendation.explanation}</p>

          <div className="pt-2 border-t border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-600 font-bold">Departments Involved:</span>
              <ul className="mt-1 space-y-0.5 text-slate-800">
                {recommendation.required_departments.map((dept: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 text-emerald-700 mr-1.5 shrink-0" /> {dept}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-slate-600 font-bold">Required Verification:</span>
              <ul className="mt-1 space-y-0.5 text-slate-800">
                {recommendation.required_fields.map((field: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 text-[#FF9933] mr-1.5 shrink-0" /> {field}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <Button
              onClick={onStartApplication}
              className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-extrabold shadow-md"
            >
              Apply for {recommendation.recommended_service}
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
