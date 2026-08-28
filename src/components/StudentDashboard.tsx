import React, { useState } from 'react';
import { 
  Car, 
  CreditCard, 
  MapPin, 
  AlertTriangle, 
  PlusCircle, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  FileText,
  Building,
  Radio,
  ChevronRight
} from 'lucide-react';
import { useParking } from '../context/ParkingContext';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    permits, 
    vehicles, 
    applications, 
    violations, 
    zones, 
    activeCampus, 
    setActiveCampus,
    setIsApplyPermitModalOpen,
    setSelectedPermitForModal,
    renewPermit,
    setActiveNavTab
  } = useParking();

  const [selectedZoneTab, setSelectedZoneTab] = useState<'all' | 'student' | 'visitor'>('student');

  // Filter current user active permit
  const activePermit = permits.find(
    p => p.userId === currentUser.id && (p.status === 'active' || p.status === 'expiring_soon')
  );

  // Filter current user vehicles
  const userVehicles = vehicles.filter(v => v.userId === currentUser.id);

  // Filter current user applications
  const userApplications = applications.filter(a => a.userId === currentUser.id);

  // Filter user violations
  const userViolations = violations.filter(v => v.userId === currentUser.id && v.status === 'unpaid');

  // Filter zones by active campus
  const campusZones = zones.filter(z => z.campus === activeCampus);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Top Welcome & Quick Actions Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize">
                {currentUser.role} Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentUser.studentStaffNumber}</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Welcome back, <span className="text-amber-400">{currentUser.name}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Manage your registered SA vehicle plates, digital access permits, and live ALPR gate clearance for UFS campuses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Campus Selector Pill */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-1 flex items-center gap-1 text-xs">
              {(['Bloemfontein Campus', 'Qwaqwa Campus', 'South Campus'] as const).map(camp => (
                <button
                  key={camp}
                  onClick={() => setActiveCampus(camp)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeCampus === camp 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {camp.replace(' Campus', '')}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsApplyPermitModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Permit Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4-Step Process Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>KovsiePark Automated Parking Clearance Workflow</span>
          </h3>
          <span className="text-[11px] text-amber-400/80 font-medium">Click any step to begin</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { 
              step: '01', 
              title: 'Register Vehicle', 
              desc: 'Link SA number plate & vehicle specs to your student/staff profile.', 
              icon: Car,
              action: () => setActiveNavTab('vehicles'),
              actionText: 'Go to Vehicles'
            },
            { 
              step: '02', 
              title: 'Submit Permit Request', 
              desc: 'Select campus, preferred zone category, and upload proof of registration.', 
              icon: FileText,
              action: () => setIsApplyPermitModalOpen(true),
              actionText: 'Apply for Permit'
            },
            { 
              step: '03', 
              title: 'Administration Review', 
              desc: 'Verification by Campus Operations & automated digital pass issuance.', 
              icon: ShieldCheck,
              action: () => setActiveNavTab('my-permits'),
              actionText: 'View Permits & Queue'
            },
            { 
              step: '04', 
              title: 'ALPR Monitored Gates', 
              desc: 'Boom gates lift automatically via optical plate recognition sensors.', 
              icon: QrCode,
              action: () => setActiveNavTab('zones'),
              actionText: 'Explore Campus Zones'
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="bg-slate-950/70 hover:bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all text-left group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      Step {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-bold text-amber-400/90 group-hover:text-amber-300">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Grid: Active Permit & Registered Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Permit Pass Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Active Digital Parking Permit</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ALPR Live Authorized
              </span>
            </div>

            {activePermit ? (
              <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Permit No:</span>
                      <span className="text-sm font-mono font-bold text-amber-400">{activePermit.permitNumber}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mt-1 capitalize">{activePermit.type} Parking Permit</h4>
                    <p className="text-xs text-slate-400">{activePermit.campus} • {activePermit.authorizedZones}</p>
                  </div>

                  {/* SA License Plate Display Box */}
                  <div className="bg-amber-400 text-slate-950 border-2 border-slate-900 rounded-lg px-4 py-1.5 shadow-md flex items-center gap-2 font-mono font-extrabold text-sm tracking-wider">
                    <span className="text-[10px] bg-slate-950 text-white px-1 py-0.5 rounded font-sans">ZA</span>
                    <span>{activePermit.assignedPlate}</span>
                    <span className="text-[10px] uppercase font-sans text-slate-800">FREE</span>
                  </div>
                </div>

                {/* Permit Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Assigned Vehicle</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{activePermit.vehicleModel}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Valid Period</span>
                    <p className="font-semibold text-slate-200 mt-0.5">{activePermit.validFrom} to {activePermit.validUntil}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Fee Status</span>
                    <p className="font-semibold text-emerald-400 mt-0.5 capitalize">R{activePermit.feeAmount} ({activePermit.paymentStatus})</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Clearance</span>
                    <p className="font-semibold text-emerald-400 mt-0.5">ALPR Gate Lift Active</p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Optical QR & ALPR disk ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => renewPermit(activePermit.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-400 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Renew for 2026
                    </button>
                    <button
                      onClick={() => setSelectedPermitForModal(activePermit)}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Display QR Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl p-6">
                <CreditCard className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-300">No Active Permit Found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  You currently do not have an active parking disk linked. Register a vehicle and submit a clearance application.
                </p>
                <button
                  onClick={() => setIsApplyPermitModalOpen(true)}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>

          {/* Pending Applications & Notifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Application Submission Status</span>
              </h3>
              <button 
                onClick={() => setActiveNavTab('my-permits')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all ({userApplications.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {userApplications.map(app => (
                <div 
                  key={app.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{app.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-300 font-medium capitalize">{app.type} Permit</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400">{app.plateNumber}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Submitted on {app.submittedDate} for {app.campus} ({app.preferredZone})
                    </p>
                    {app.adminNote && (
                      <p className="text-[11px] text-amber-300/80 italic">Note: {app.adminNote}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                      app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Vehicles + Zone Availability Snapshot */}
        <div className="space-y-6">
          {/* Registered Vehicles Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">My Vehicles</h3>
              </div>
              <button 
                onClick={() => setActiveNavTab('vehicles')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {userVehicles.map(veh => (
                <div 
                  key={veh.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{veh.make} {veh.model}</h4>
                      <p className="text-[11px] font-mono text-slate-400">{veh.plateNumber} • {veh.color}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    veh.isPrimary ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500'
                  }`}>
                    {veh.isPrimary ? 'Primary' : 'Secondary'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Zone Live Meter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Zone Density</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{activeCampus.replace(' Campus', '')}</span>
            </div>

            <div className="space-y-3">
              {campusZones.slice(0, 3).map(zone => {
                const occupancyRate = Math.round((zone.occupiedBays / zone.totalBays) * 100);
                const isFull = occupancyRate >= 90;
                return (
                  <div key={zone.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">{zone.name}</span>
                      <span className={`font-mono font-bold ${isFull ? 'text-red-400' : 'text-emerald-400'}`}>
                        {zone.availableBays} bays free
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull ? 'bg-red-500' : occupancyRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveNavTab('zones')}
              className="mt-4 w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Interactive Map & Gates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
