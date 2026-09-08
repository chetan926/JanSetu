import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search, GraduationCap, Wheat, School, Stethoscope, Heart, Home, Sprout,
  Building, Briefcase, Car, Utensils, Trees, ArrowRight, CheckCircle2, Filter
} from 'lucide-react';
import { ApplicationWizardModal } from '@/components/applications/ApplicationWizardModal';

interface DepartmentDef {
  id: string;
  name: string;
  emoji: string;
  icon: any;
  subtext: string;
  serviceId: string;
  serviceName: string;
  description: string;
  requiredDepts: string[];
  requiredFields: string[];
}

export const Services: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const departments: DepartmentDef[] = [
    {
      id: 'agriculture',
      name: 'Agriculture Department',
      emoji: '🌾',
      icon: Wheat,
      subtext: 'Farmer schemes • Crop-related services • Subsidies',
      serviceId: 'AGRI-001',
      serviceName: 'PM Kisan & Crop Fertilizer Subsidy Scheme',
      description: 'Direct landholding subsidy & crop insurance assistance for registered farmers.',
      requiredDepts: ['Agriculture Dept', 'Income Tax Dept', 'Revenue & Land Dept'],
      requiredFields: ['Annual Income', 'Landholding Verification']
    },
    {
      id: 'education',
      name: 'Higher & Technical Education Department',
      emoji: '🎓',
      icon: GraduationCap,
      subtext: 'Scholarships • Student services • Education applications',
      serviceId: 'SCHOLARSHIP-001',
      serviceName: 'Higher Education Scholarship Scheme 2026',
      description: 'Financial assistance scheme for higher education students from low-income families.',
      requiredDepts: ['Higher Education Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['Annual Income (≤ ₹2,50,000)', 'Enrollment Status (ACTIVE)', 'Identity Verified']
    },
    {
      id: 'school_edu',
      name: 'School Education & Sports Department',
      emoji: '🏫',
      icon: School,
      subtext: 'School services • Student schemes • Sports grants',
      serviceId: 'SCHOOL-001',
      serviceName: 'Kanya Vidya Dhan & Free Textbook Scheme',
      description: 'Financial grant & educational kit for female school students in secondary education.',
      requiredDepts: ['School Education Dept', 'Property & Identity Dept'],
      requiredFields: ['UDISE School Enrollment', 'Identity Verification']
    },
    {
      id: 'health',
      name: 'Public Health Department',
      emoji: '🏥',
      icon: Stethoscope,
      subtext: 'Health schemes • Public health services • Medical insurance',
      serviceId: 'HEALTH-001',
      serviceName: 'Ayushman Universal Health Protection Grant',
      description: 'Cashless hospital treatment insurance up to ₹5 Lakhs per family per year.',
      requiredDepts: ['Public Health Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['Annual Income', 'ABHA Health Card Status']
    },
    {
      id: 'women_child',
      name: 'Women & Child Development Department',
      emoji: '👩‍👧',
      icon: Heart,
      subtext: 'Women welfare • Child welfare schemes • Self-reliance',
      serviceId: 'WOMEN-001',
      serviceName: 'Ladki Bahin Women Welfare & Self-Reliance Grant',
      description: 'Monthly financial assistance & skill development grant for women entrepreneurs.',
      requiredDepts: ['Women & Child Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['Annual Income', 'Identity Verification']
    },
    {
      id: 'housing',
      name: 'Housing Department',
      emoji: '🏠',
      icon: Home,
      subtext: 'Housing schemes • Housing applications • PMAY grant',
      serviceId: 'HOUSING-001',
      serviceName: 'PMAY Urban & Rural Affordable Housing Grant',
      description: 'Financial interest subsidy & construction grant for first-time home buyers.',
      requiredDepts: ['Housing Dept', 'Income Tax Dept', 'Revenue & Land Dept'],
      requiredFields: ['Annual Income', 'First-time Buyer Validation']
    },
    {
      id: 'rural_dev',
      name: 'Rural Development Department',
      emoji: '🌾',
      icon: Sprout,
      subtext: 'Rural schemes • Village development services • MNREGA',
      serviceId: 'RURAL-001',
      serviceName: 'MNREGA Village Infrastructure & Job Guarantee',
      description: '100-day guaranteed wage employment & village sanitation infrastructure grant.',
      requiredDepts: ['Rural Development Dept', 'Identity Dept'],
      requiredFields: ['Job Card Verification', 'Identity Validation']
    },
    {
      id: 'urban_dev',
      name: 'Urban Development Department',
      emoji: '🏙️',
      icon: Building,
      subtext: 'Urban services • Municipal services • Street vendor loans',
      serviceId: 'URBAN-001',
      serviceName: 'PM SVANidhi Street Vendor Subsidy',
      description: 'Collateral-free working capital loan & municipal property tax relief.',
      requiredDepts: ['Urban Development Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['Vendor ID Status', 'Identity Verification']
    },
    {
      id: 'labour',
      name: 'Labour Department',
      emoji: '💼',
      icon: Briefcase,
      subtext: 'Worker services • Employment/welfare schemes • Pensions',
      serviceId: 'LABOUR-001',
      serviceName: 'Unorganized Workers Pension & Safety Net',
      description: 'Social security pension, accidental insurance, and welfare kit for construction workers.',
      requiredDepts: ['Labour Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['e-Shram UAN', 'Identity Verification']
    },
    {
      id: 'transport',
      name: 'Transport / Motor Vehicles Department',
      emoji: '🚗',
      icon: Car,
      subtext: 'Driving licence • Vehicle-related services • Smart RC',
      serviceId: 'TRANS-001',
      serviceName: 'Digital Smart Driving License & Vehicle RC Renewal',
      description: 'Instant zero-paperwork driving license issuance, transfer of ownership, and fitness RC.',
      requiredDepts: ['Transport / Motor Vehicles Dept', 'Property & Identity Dept'],
      requiredFields: ['Driving Test Result', 'Biometric Validation']
    },
    {
      id: 'food_supplies',
      name: 'Food, Civil Supplies & Consumer Protection',
      emoji: '🍚',
      icon: Utensils,
      subtext: 'Ration card • Food services • Grain allotment',
      serviceId: 'FOOD-001',
      serviceName: 'Smart Antyodaya Ration Card & Grain Allotment',
      description: 'Subsidized food grain distribution (Wheat, Rice, Pulses) for BPL families.',
      requiredDepts: ['Food & Civil Supplies Dept', 'Income Tax Dept', 'Identity Dept'],
      requiredFields: ['Annual Income', 'Family Unit Count']
    },
    {
      id: 'revenue_forest',
      name: 'Revenue & Forest Department',
      emoji: '🌳',
      icon: Trees,
      subtext: 'Land records • Certificates • Revenue services',
      serviceId: 'REVENUE-001',
      serviceName: '7/12 Land Record Extraction & Income/Caste Certificate',
      description: 'Instant digitally signed 7/12 land extract, income certificate, and non-creamy layer validation.',
      requiredDepts: ['Revenue & Forest Dept', 'Property & Identity Dept'],
      requiredFields: ['Khata Land Record', 'Digital Caste Seal']
    }
  ];

  const filteredDepts = departments.filter((dept) => {
    const matchesDept = selectedDept === 'all' || dept.id === selectedDept;
    const matchesSearch =
      searchQuery === '' ||
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.subtext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Government Services & Department Catalog
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Access 12 connected government departments with automated, consent-driven interoperable verification.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments, schemes, ration..."
            className="pl-9 bg-white border-slate-300 focus:border-[#FF9933]"
          />
        </div>
      </div>

      {/* 12 Departments Filter Chips */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5 text-[#FF9933]" />
          <span>Department Selection Filter ({departments.length} Connected Departments)</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDept === 'all'
                ? 'bg-[#002D62] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            🏛️ All Departments (12)
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedDept === dept.id
                  ? 'bg-[#002D62] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>{dept.emoji}</span>
              <span>{dept.name.replace(' Department', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepts.map((dept) => {
          return (
            <GlassCard key={dept.id} className="p-6 border-slate-200 bg-white flex flex-col justify-between space-y-4 hover:border-[#FF9933]/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
                      {dept.emoji}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0F172A] text-base leading-tight">{dept.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{dept.subtext}</p>
                    </div>
                  </div>
                  <Badge variant="gold" className="text-[10px]">API Connected</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#002D62] font-bold">{dept.serviceId}</span>
                    <Badge variant="success" className="text-[10px]">Zero Document</Badge>
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-sm">{dept.serviceName}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{dept.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-500 font-bold text-[11px]">Interoperable Depts:</span>
                    <ul className="mt-1 space-y-0.5 text-slate-800 font-mono text-[11px]">
                      {dept.requiredDepts.map((d, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 text-emerald-700 mr-1.5 shrink-0" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-slate-500 font-bold text-[11px]">Required Fields:</span>
                    <ul className="mt-1 space-y-0.5 text-slate-800 text-[11px]">
                      {dept.requiredFields.map((f, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 text-[#FF9933] mr-1.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => setIsWizardOpen(true)}
                  className="w-full sm:w-auto bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-extrabold shadow-md"
                >
                  Check Eligibility & Apply <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Interoperable Application Wizard Modal */}
      <ApplicationWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        citizenId="C1001"
      />
    </div>
  );
};
