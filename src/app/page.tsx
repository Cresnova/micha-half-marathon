'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Zap, Award, Activity, User, MapPin, Trophy, ChevronRight, ChevronDown, Timer, Dumbbell, Heart, Menu, X } from 'lucide-react';

const MarathonTrainingDashboard = () => {
  const [completedDays, setCompletedDays] = useState({ 'week1-day1': true }); // Mark July 14th as complete
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showExerciseDetails, setShowExerciseDetails] = useState({});
  const [showNutritionPlan, setShowNutritionPlan] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Training start date (July 14th, 2025)
  const startDate = new Date('2025-07-14');
  const raceDate = new Date('2025-09-07');

  // Calculate time until race
  const getTimeUntilRace = () => {
    const now = new Date();
    const timeDiff = raceDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const weeks = Math.floor(days / 7);
    return { days, hours, minutes, seconds, weeks };
  };

  const [timeUntilRace, setTimeUntilRace] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, weeks: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      setTimeUntilRace(getTimeUntilRace());
    };
    updateTime();
    
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDay = (week, day) => {
    const key = `week${week}-day${day}`;
    setCompletedDays(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isWeekCompleted = (weekNum) => {
    return Object.keys(completedDays).filter(key => 
      key.startsWith(`week${weekNum}-`) && completedDays[key]
    ).length === 7;
  };

  const getCurrentDay = () => {
    const now = new Date();
    const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceStart / 7) + 1;
    const currentDay = (daysSinceStart % 7) + 1;
    return { currentWeek: Math.min(Math.max(currentWeek, 1), 8), currentDay: Math.min(Math.max(currentDay, 1), 7) };
  };

  const { currentWeek: todaysWeek, currentDay: todaysDay } = getCurrentDay();

  // Function to get date for a specific week and day
  const getDateForWeekDay = (weekNum, dayNum) => {
    const totalDays = (weekNum - 1) * 7 + (dayNum - 1);
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + totalDays);
    return targetDate;
  };

  // Function to format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const exercises = {
    stretching: {
      'Myrtl routine': {
        description: 'Hip activation routine targeting glute medius, stabilizers, and hip rotators.',
        steps: [
          'Clamshells: Lie on side, knees bent 45°, open top knee like clamshell (10-15 reps)',
          'Side leg lifts: Straight leg lift to 45°, control down (10-15 reps)',
          'Fire hydrants: On hands/knees, lift knee to side keeping hip level (10-15 reps)',
          'Leg swings: Dynamic front-to-back and side-to-side (10 each direction)'
        ],
        image: '🧘‍♂️'
      },
      'Hip flexor stretch': {
        description: 'Releases tension in hip flexors to improve stride and reduce lower back stress.',
        steps: [
          'Kneel on one knee, other foot forward',
          'Press hips forward while keeping torso upright',
          'Feel stretch in front of back leg hip',
          'Hold 30-60 seconds per side',
          'Can be done standing against wall for support'
        ],
        image: '🦵'
      },
      'Lizard pose': {
        description: 'Deep hip opener that stretches hip flexors, groin, and improves mobility.',
        steps: [
          'Start in low lunge position',
          'Lower forearms to floor inside front leg',
          'Keep back leg straight and active',
          'Breathe deeply, sink hips toward floor',
          'Hold 30-60 seconds per side'
        ],
        image: '🦎'
      },
      'ITB stretch': {
        description: 'Releases tension in iliotibial band to prevent knee pain and hip tightness.',
        steps: [
          'Stand with affected leg crossed behind',
          'Lean away from affected side against wall',
          'Feel stretch along outer thigh/hip',
          'Or lie on side, pull top knee toward chest',
          'Hold 30-60 seconds per side'
        ],
        image: '🤸‍♂️'
      },
      'Foam rolling': {
        description: 'Myofascial release to improve tissue quality and reduce muscle tension.',
        steps: [
          'IT Band: Lie on side, roll from hip to knee slowly',
          'Quads: Face down, roll front of thighs',
          'Calves: Sit, roll back of lower legs',
          'Focus 30-60 seconds per area',
          'Pause on tender spots, breathe deeply'
        ],
        image: '🎳'
      }
    },
    gym: {
      'Clamshells': {
        description: 'Targets hip abductors and glute medius for knee stability and injury prevention.',
        steps: [
          'Lie on side with legs stacked, knees bent 45°',
          'Keep feet together, core engaged',
          'Open top knee toward ceiling without rolling hips back',
          'Control the movement, focus on outer glute activation',
          'Perform 15-20 reps per side'
        ],
        image: '🐚'
      },
      'Glute bridges': {
        description: 'Strengthens glutes and posterior chain while improving hip stability.',
        steps: [
          'Lie on back, knees bent, feet flat on floor',
          'Squeeze glutes and drive hips up',
          'Create straight line from knees to shoulders',
          'Hold for 2 seconds at top, lower slowly',
          'Perform 15-20 reps, focus on glute activation'
        ],
        image: '🌉'
      },
      'Core circuit': {
        description: 'Strengthens core stability essential for efficient running form.',
        steps: [
          'Plank: Hold 30-60 seconds, straight line body',
          'Side planks: 30 seconds each side',
          'Dead bugs: 10 reps each side, opposite arm/leg',
          'Bird dogs: 10 reps each side, hold 3 seconds',
          'Russian twists: 20 reps total'
        ],
        image: '💪'
      },
      'Balance drills': {
        description: 'Improves proprioception and single-leg stability for injury prevention.',
        steps: [
          'Single leg stands: 30 seconds each leg',
          'Eyes closed balance: 15 seconds each leg',
          'Single leg mini squats: 10 reps each leg',
          'Heel-to-toe walk: 20 steps forward/back',
          'Balance beam walk or line walk'
        ],
        image: '⚖️'
      }
    }
  };

  const trainingPlan = {
    1: {
      title: 'Foundation Week',
      focus: 'Build base fitness and establish routine',
      days: [
        { day: 'Monday', activity: '11.3 km @ 4:39/km', type: 'tempo', strength: 'Full stretch routine', purpose: 'Start strong, test fitness, build flexibility' },
        { day: 'Tuesday', activity: 'Rest or light cycle', type: 'rest', strength: 'Gym: glutes, quads, core, calf, balance', purpose: 'Strengthen stabilizers, support knees' },
        { day: 'Wednesday', activity: 'Easy 6 km @ 6:00/km + 4×100m strides', type: 'easy', strength: 'Myrtl warm-up', purpose: 'Recovery pace, improve running form' },
        { day: 'Thursday', activity: 'Rest or mobility', type: 'rest', strength: 'Gym: same as Tue', purpose: 'Load glutes & quads, improve hip stability' },
        { day: 'Friday', activity: '3×1 km @ 4:40/km, 2 min jog rest', type: 'speed', strength: 'Calf + hip flexor stretches', purpose: 'Improve speed, reinforce cadence' },
        { day: 'Saturday', activity: 'Easy 6 km', type: 'easy', strength: 'Foam roll + lizard pose', purpose: 'Light aerobic base, restore hips' },
        { day: 'Sunday', activity: 'Long run 13 km @ 5:30/km', type: 'long', strength: 'Full stretch routine', purpose: 'Build aerobic endurance' }
      ]
    },
    2: {
      title: 'Base Building',
      focus: 'Maintain aerobic base and strengthen stabilizers',
      days: [
        { day: 'Monday', activity: 'Rest', type: 'rest', strength: 'Hip/glute stretch + foam rolling', purpose: 'Active recovery, loosen tight spots' },
        { day: 'Tuesday', activity: '8 km easy @ 6:00/km', type: 'easy', strength: 'Gym: clamshells, bridges, calf raises', purpose: 'Maintain aerobic base, strengthen knees' },
        { day: 'Wednesday', activity: 'Rest or mobility', type: 'rest', strength: 'Core circuit + quad stretching', purpose: 'Recovery and stability' },
        { day: 'Thursday', activity: 'Tempo 6 km @ 4:55/km (plus warm-up/cooldown)', type: 'tempo', strength: 'Hip opener + hamstring stretch', purpose: 'Build threshold capacity' },
        { day: 'Friday', activity: '5–6 km recovery jog', type: 'easy', strength: 'Light stretching only', purpose: 'Flush soreness' },
        { day: 'Saturday', activity: 'Optional bike ride or swim', type: 'cross', strength: 'Stretch + light strength if no workout', purpose: 'Cross-train for joint-friendly movement' },
        { day: 'Sunday', activity: 'Long run 15 km @ 5:25/km', type: 'long', strength: 'Full stretch + calf roll', purpose: 'Increase long run gradually' }
      ]
    },
    3: {
      title: 'Speed Development',
      focus: 'Improve VO2 max and leg turnover',
      days: [
        { day: 'Monday', activity: 'Rest', type: 'rest', strength: 'Quad + calf + glute foam roll', purpose: 'Recovery' },
        { day: 'Tuesday', activity: '6×800m @ 4:25/km, 90s jog rest', type: 'speed', strength: 'Myrtl + ITB stretch', purpose: 'Improve VO2 max, leg turnover' },
        { day: 'Wednesday', activity: '6 km easy + strides', type: 'easy', strength: 'Gym session', purpose: 'Keep legs responsive' },
        { day: 'Thursday', activity: 'Rest or light cycling', type: 'rest', strength: 'Stretch + foam roll', purpose: 'Flush system without impact' },
        { day: 'Friday', activity: '8 km @ 5:30/km', type: 'steady', strength: 'Stretch + lizard pose', purpose: 'Steady volume build' },
        { day: 'Saturday', activity: 'Rest', type: 'rest', strength: 'Balance/core circuit', purpose: 'Prevent overload' },
        { day: 'Sunday', activity: 'Long run 16 km @ 5:20/km', type: 'long', strength: 'Stretch + quad/hip flexor focus', purpose: 'Solid endurance base' }
      ]
    },
    4: {
      title: 'Power & Form',
      focus: 'Build power and maintain endurance base',
      days: [
        { day: 'Monday', activity: '5 km walk or rest', type: 'rest', strength: 'Hip flexor + glute bridge ISO holds', purpose: 'Recovery + glute priming' },
        { day: 'Tuesday', activity: '10 km steady @ 5:00/km', type: 'steady', strength: 'Light foam rolling', purpose: 'Increase aerobic threshold' },
        { day: 'Wednesday', activity: 'Hill sprints: 6×30s hard up + walk down', type: 'hills', strength: 'Quad/ITB stretch', purpose: 'Build power and form' },
        { day: 'Thursday', activity: 'Gym: core, clamshells, SLR, step-ups', type: 'strength', strength: 'Hamstring + lunge stretch', purpose: 'Strengthen hips and knees' },
        { day: 'Friday', activity: '7 km easy', type: 'easy', strength: 'Hip mobility + calves', purpose: 'Aerobic efficiency' },
        { day: 'Saturday', activity: 'Rest', type: 'rest', strength: 'Glute stretch + balance work', purpose: 'Maintain joint control' },
        { day: 'Sunday', activity: 'Long run 18 km @ 5:20/km', type: 'long', strength: 'Full stretch routine', purpose: 'Push into peak endurance' }
      ]
    },
    5: {
      title: 'Volume Peak',
      focus: 'Peak training volume with quality sessions',
      days: [
        { day: 'Monday', activity: '5 km jog or walk', type: 'easy', strength: 'Light stretch', purpose: 'Keep system moving' },
        { day: 'Tuesday', activity: 'Tempo 7 km @ 4:50/km', type: 'tempo', strength: 'ITB foam roll + hamstring hold', purpose: 'Peak aerobic tempo training' },
        { day: 'Wednesday', activity: '8 km easy', type: 'easy', strength: 'Glute bridges + balance drills', purpose: 'Hold volume, reinforce stability' },
        { day: 'Thursday', activity: 'Gym session', type: 'strength', strength: 'Full mobility circuit', purpose: 'Build neuromuscular capacity' },
        { day: 'Friday', activity: 'Rest or optional swim', type: 'rest', strength: 'Quad + glute stretch', purpose: 'Restore body' },
        { day: 'Saturday', activity: '6 km recovery jog', type: 'easy', strength: 'Calf + lizard + foam rolling', purpose: 'Gentle stimulus' },
        { day: 'Sunday', activity: 'Long run 19 km w/ final 3 km @ 4:45/km', type: 'long', strength: 'Full post-run stretch', purpose: 'Simulate race finish' }
      ]
    },
    6: {
      title: 'Training Peak',
      focus: 'Peak training stress and race simulation',
      days: [
        { day: 'Monday', activity: '6 km recovery walk or jog', type: 'easy', strength: 'Foam rolling', purpose: 'Maximize recovery' },
        { day: 'Tuesday', activity: '3×2 km @ 4:45/km, 3-min rest', type: 'speed', strength: 'Hip opener, quad + calf stretches', purpose: 'VO2 max & lactate threshold' },
        { day: 'Wednesday', activity: 'Rest or yoga', type: 'rest', strength: 'Mobility + balance circuit', purpose: 'Neuromuscular reset' },
        { day: 'Thursday', activity: '8 km easy', type: 'easy', strength: 'ITB + calf roll', purpose: 'High-volume endurance' },
        { day: 'Friday', activity: 'Gym: bridges, core, bird-dog', type: 'strength', strength: 'Lizard pose + foam roll', purpose: 'Reinforce good form' },
        { day: 'Saturday', activity: 'Rest', type: 'rest', strength: 'Stretching only', purpose: 'Prepare for peak long run' },
        { day: 'Sunday', activity: 'Long run 21 km @ 5:20/km', type: 'long', strength: 'Full post-run mobility', purpose: 'Dress rehearsal' }
      ]
    },
    7: {
      title: 'Taper Begins',
      focus: 'Reduce volume, maintain sharpness',
      days: [
        { day: 'Monday', activity: 'Rest', type: 'rest', strength: 'Full-body foam roll', purpose: 'Recover from peak volume' },
        { day: 'Tuesday', activity: 'Tempo 5 km @ 4:50/km', type: 'tempo', strength: 'Quick mobility + activation', purpose: 'Sharpen race pace' },
        { day: 'Wednesday', activity: '6 km easy', type: 'easy', strength: 'Calf + hamstring stretch', purpose: 'Aerobic activity without fatigue' },
        { day: 'Thursday', activity: 'Rest or light jog', type: 'rest', strength: 'Light glute and ITB work', purpose: 'Prevent tightness' },
        { day: 'Friday', activity: 'Gym (light version)', type: 'strength', strength: 'Core + quad ISO holds', purpose: 'Maintain tone, no DOMS' },
        { day: 'Saturday', activity: '4 km shakeout', type: 'easy', strength: 'Stretching + mental prep', purpose: 'Stay loose' },
        { day: 'Sunday', activity: 'Long run 14 km @ 5:30/km', type: 'long', strength: 'Gentle cooldown', purpose: 'Controlled taper distance' }
      ]
    },
    8: {
      title: 'Race Week!',
      focus: 'Final preparation and race execution',
      days: [
        { day: 'Monday', activity: '5 km easy', type: 'easy', strength: 'Hip & hamstring stretch', purpose: 'Keep blood flowing' },
        { day: 'Tuesday', activity: 'Rest', type: 'rest', strength: 'Foam roll + mobility', purpose: 'Full recovery' },
        { day: 'Wednesday', activity: '4×400m @ race pace (4:58/km)', type: 'speed', strength: 'Quick stretch + calf roll', purpose: 'Stay sharp, do not tire out' },
        { day: 'Thursday', activity: 'Rest', type: 'rest', strength: 'Lizard + ITB foam roll', purpose: 'Full relaxation' },
        { day: 'Friday', activity: '4 km jog + 2 strides', type: 'easy', strength: 'Breath work + mobility', purpose: 'Focus and loosen up' },
        { day: 'Saturday', activity: 'REST', type: 'rest', strength: 'Early night, hydrate, carbs', purpose: 'Ready to race' },
        { day: 'Sunday', activity: '🎯 RACE DAY – 21.1 km @ 4:58/km', type: 'race', strength: 'Light walk after + full cooldown', purpose: '💥 Go crush it 💥' }
      ]
    }
  };

  const getActivityColor = (type) => {
    const colors = {
      tempo: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      speed: 'bg-gradient-to-r from-red-400 to-pink-500',
      long: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      easy: 'bg-gradient-to-r from-green-400 to-emerald-500',
      rest: 'bg-gradient-to-r from-gray-400 to-slate-500',
      strength: 'bg-gradient-to-r from-purple-400 to-violet-500',
      cross: 'bg-gradient-to-r from-teal-400 to-cyan-500',
      steady: 'bg-gradient-to-r from-yellow-400 to-amber-500',
      hills: 'bg-gradient-to-r from-orange-400 to-red-500',
      race: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500'
    };
    return colors[type] || 'bg-gradient-to-r from-gray-400 to-slate-500';
  };

  const getActivityTypeInfo = (type) => {
    const info = {
      tempo: { label: 'Tempo', description: 'Builds lactate threshold' },
      speed: { label: 'Speed', description: 'Improves VO2 max & power' },
      long: { label: 'Long Run', description: 'Builds endurance & mental strength' },
      easy: { label: 'Easy', description: 'Recovery & aerobic base' },
      rest: { label: 'Rest', description: 'Recovery & injury prevention' },
      strength: { label: 'Strength', description: 'Muscle activation & stability' },
      cross: { label: 'Cross Train', description: 'Active recovery, joint friendly' },
      steady: { label: 'Steady', description: 'Aerobic threshold development' },
      hills: { label: 'Hills', description: 'Power & running form' },
      race: { label: 'RACE DAY', description: 'Execute your goals!' }
    };
    return info[type] || { label: 'Training', description: 'Building fitness' };
  };

  const todaysWorkout = trainingPlan[todaysWeek]?.days[todaysDay - 1];

  const getTotalCompletedDays = () => {
    return Object.values(completedDays).filter(Boolean).length;
  };

  const navigateToExercises = (exerciseName) => {
    scrollToSection('exercises');
    setTimeout(() => {
      setShowExerciseDetails(prev => ({
        ...prev,
        [exerciseName]: true
      }));
    }, 500);
  };

  const navigationItems = [
    { id: 'today', label: 'Today&apos;s Workout', icon: Calendar },
    { id: 'weeks', label: '8 Week Training Plan', icon: Activity },
    { id: 'exercises', label: 'Exercise Guide', icon: Dumbbell },
    { id: 'progress', label: 'Training Progress', icon: Award },
    { id: 'nutrition', label: 'Race Week Nutrition Plan', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-mint-50 to-emerald-50 text-slate-800">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-slate-800">Marathon Prep</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {[
                { id: 'hero', label: 'Overview', icon: Target },
                { id: 'today', label: 'Today', icon: Calendar },
                { id: 'weeks', label: 'Training', icon: Activity },
                { id: 'exercises', label: 'Exercises', icon: Dumbbell },
                { id: 'progress', label: 'Progress', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
                    activeSection === id 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-emerald-100">
              <div className="space-y-2">
                {navigationItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-medium"
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-24 pb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm rounded-full px-8 py-6 shadow-lg">
              <Trophy className="w-10 h-10 text-emerald-600" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                London Big Half
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-base md:text-lg mb-12">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 md:px-6 py-3 shadow-md">
                <Target className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Goal: 1:45:00</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 md:px-6 py-3 shadow-md">
                <Zap className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Pace: 4:58/km</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 md:px-6 py-3 shadow-md">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">September 7, 2025</span>
              </div>
            </div>

            {/* Enhanced Countdown */}
            <div className="bg-gradient-to-r from-white to-emerald-50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-100 inline-block">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-emerald-700 flex items-center justify-center gap-3">
                <Timer className="w-6 md:w-8 h-6 md:h-8" />
                Race Countdown
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { value: timeUntilRace.days, label: 'Days', color: 'text-emerald-600' },
                  { value: timeUntilRace.hours, label: 'Hours', color: 'text-teal-600' },
                  { value: timeUntilRace.minutes, label: 'Minutes', color: 'text-cyan-600' },
                  { value: timeUntilRace.seconds, label: 'Seconds', color: 'text-blue-600' }
                ].map(({ value, label, color }) => (
                  <div key={label} className="text-center">
                    <div className={`text-3xl md:text-5xl lg:text-6xl font-bold ${color} mb-2`} suppressHydrationWarning>
                      {isClient ? value.toString().padStart(2, '0') : '00'}
                    </div>
                    <div className="text-slate-600 font-medium text-sm md:text-lg">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Timeline */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
          <h3 className="text-xl font-bold text-center mb-6 text-slate-700">Training Progress Timeline</h3>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-emerald-100 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
              style={{ width: `${(getTotalCompletedDays() / 56) * 100}%` }}
            ></div>
            <div className="relative flex justify-between">
              {Object.entries(trainingPlan).map(([weekNum]) => (
                <div key={weekNum} className="flex flex-col items-center">
                  <div className={`w-6 md:w-8 h-6 md:h-8 rounded-full border-4 bg-white flex items-center justify-center text-xs md:text-sm font-bold transition-all ${
                    isWeekCompleted(parseInt(weekNum)) 
                      ? 'border-emerald-500 text-emerald-600' 
                      : parseInt(weekNum) <= todaysWeek
                        ? 'border-teal-400 text-teal-600'
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {parseInt(weekNum) === 8 ? <Trophy className="w-3 md:w-4 h-3 md:h-4" /> : weekNum}
                  </div>
                  <div className="mt-2 text-xs text-center text-slate-600 max-w-16">
                    Week {weekNum}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      {todaysWorkout && (
        <section id="today" className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-white to-emerald-50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-100">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
              <Calendar className="w-6 md:w-8 h-6 md:h-8 text-emerald-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Today&apos;s Workout</h2>
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <span>Week {todaysWeek} • Day {todaysDay}</span>
                <span className="text-emerald-600">• {formatDate(getDateForWeekDay(todaysWeek, todaysDay))}</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left: Running Activity */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${getActivityColor(todaysWorkout.type).replace('bg-gradient-to-r', 'bg-emerald-500')}`}></div>
                    <h3 className="text-xl font-bold text-emerald-700">Running Activity</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-emerald-600 font-bold mb-1 uppercase tracking-wide">
                      {getActivityTypeInfo(todaysWorkout.type).label}
                    </div>
                    <div className="text-lg font-semibold text-slate-800 mb-2">{todaysWorkout.activity}</div>
                    <div className="text-sm text-slate-600">{getActivityTypeInfo(todaysWorkout.type).description}</div>
                  </div>
                </div>
              </div>

              {/* Middle: Strength & Recovery */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-bold text-emerald-700">Strength & Recovery</h3>
                  </div>
                  <button
                    onClick={() => navigateToExercises(todaysWorkout.strength)}
                    className="text-left w-full group"
                  >
                    <div className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {todaysWorkout.strength}
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 group-hover:text-emerald-700 transition-colors">
                      <span className="text-sm font-medium">View exercise guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right: Purpose & Context */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-bold text-emerald-700">Today&apos;s Purpose</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-emerald-600 font-bold mb-1 uppercase tracking-wide">Why This Workout</div>
                      <div className="text-slate-700 leading-relaxed">{todaysWorkout.purpose}</div>
                    </div>
                    <div>
                      <div className="text-sm text-emerald-600 font-bold mb-1 uppercase tracking-wide">Week Focus</div>
                      <div className="text-slate-600 text-sm">{trainingPlan[todaysWeek].focus}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => toggleDay(todaysWeek, todaysDay)}
                className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all transform hover:scale-105 ${
                  completedDays[`week${todaysWeek}-day${todaysDay}`]
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <CheckCircle className="w-5 md:w-6 h-5 md:h-6" />
                {completedDays[`week${todaysWeek}-day${todaysDay}`] ? 'Workout Completed! 🎉' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Week Navigation */}
      <section id="weeks" className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">8-Week Training Plan</h2>
          <p className="text-lg text-slate-600">Your complete journey to a 1:45:00 half marathon</p>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8">
          {Object.entries(trainingPlan).map(([weekNum]) => (
            <button
              key={weekNum}
              onClick={() => setCurrentWeek(parseInt(weekNum))}
              className={`group relative px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 md:gap-3 text-sm md:text-base ${
                currentWeek === parseInt(weekNum)
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl'
                  : 'bg-white text-slate-700 shadow-lg hover:shadow-xl border border-emerald-100'
              } ${isWeekCompleted(parseInt(weekNum)) ? 'ring-2 ring-green-400' : ''}`}
            >
              {isWeekCompleted(parseInt(weekNum)) && (
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
              )}
              <span>Week {weekNum}</span>
              {parseInt(weekNum) === 8 && <Trophy className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />}
              {isWeekCompleted(parseInt(weekNum)) && (
                <div className="absolute -top-2 -right-2 w-5 md:w-6 h-5 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current Week Display */}
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Week {currentWeek}: {trainingPlan[currentWeek].title}
                </h2>
                <p className="text-emerald-100 text-lg md:text-xl">{trainingPlan[currentWeek].focus}</p>
              </div>
              {isWeekCompleted(currentWeek) && (
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-4 md:px-6 py-3">
                  <Award className="w-6 md:w-8 h-6 md:h-8 text-yellow-300" />
                  <span className="text-lg md:text-xl font-bold">Complete!</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-4 md:gap-6">
              {trainingPlan[currentWeek].days.map((day, index) => (
                <div
                  key={index}
                  className={`group bg-gradient-to-r from-slate-50 to-emerald-50 rounded-2xl p-4 md:p-6 transition-all hover:shadow-lg border-2 ${
                    completedDays[`week${currentWeek}-day${index + 1}`] 
                      ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50' 
                      : 'border-emerald-100 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                    <div className="flex-1 grid lg:grid-cols-3 gap-4 md:gap-6">
                      {/* Day & Activity */}
                      <div className="lg:col-span-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800">{day.day}</h3>
                            <span className="text-sm text-slate-500 font-medium">{formatDate(getDateForWeekDay(currentWeek, index + 1))}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${getActivityColor(day.type).replace('bg-gradient-to-r', 'bg-emerald-500')}`}></div>
                            <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-wide">
                              {getActivityTypeInfo(day.type).label}
                            </span>
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-slate-700 mb-1">{day.activity}</div>
                        <div className="text-sm text-slate-500">{getActivityTypeInfo(day.type).description}</div>
                      </div>

                      {/* Strength & Recovery */}
                      <div className="lg:col-span-1">
                        <h4 className="text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wide">Strength & Recovery</h4>
                        <button
                          onClick={() => navigateToExercises(day.strength)}
                          className="text-slate-700 hover:text-emerald-600 transition-colors group/btn text-left"
                        >
                          <div className="font-semibold group-hover/btn:underline">{day.strength}</div>
                          <div className="flex items-center gap-1 text-emerald-600 text-sm mt-1">
                            <span>View exercises</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      </div>

                      {/* Purpose */}
                      <div className="lg:col-span-1">
                        <h4 className="text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wide">Purpose</h4>
                        <div className="text-slate-600 leading-relaxed">{day.purpose}</div>
                      </div>
                    </div>
                    
                    {/* Complete Button */}
                    <button
                      onClick={() => toggleDay(currentWeek, index + 1)}
                      className={`w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center transition-all transform hover:scale-110 flex-shrink-0 ${
                        completedDays[`week${currentWeek}-day${index + 1}`]
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white'
                      }`}
                    >
                      <CheckCircle className="w-6 md:w-8 h-6 md:h-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Guide */}
      <section id="exercises" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Dumbbell className="w-8 md:w-10 h-8 md:h-10 text-emerald-600" />
            Exercise Guide
          </h2>
          <p className="text-lg text-slate-600">Complete movement library for injury prevention and performance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Stretching Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                🧘‍♂️ Stretching & Mobility
              </h3>
              <p className="text-blue-100 mt-2">Essential flexibility work for injury prevention</p>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(exercises.stretching).map(([name, exercise]) => (
                <div key={name} className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <button
                    onClick={() => setShowExerciseDetails(prev => ({
                      ...prev,
                      [name]: !prev[name]
                    }))}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exercise.image}</span>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{name}</h4>
                        <p className="text-slate-600 text-sm">{exercise.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showExerciseDetails[name] ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showExerciseDetails[name] && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h5 className="font-bold mb-3 text-emerald-600">How to perform:</h5>
                      <ol className="space-y-2">
                        {exercise.steps.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gym Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6 text-white">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                💪 Gym & Strength
              </h3>
              <p className="text-purple-100 mt-2">Build strength and stability for better running</p>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(exercises.gym).map(([name, exercise]) => (
                <div key={name} className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <button
                    onClick={() => setShowExerciseDetails(prev => ({
                      ...prev,
                      [name]: !prev[name]
                    }))}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exercise.image}</span>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{name}</h4>
                        <p className="text-slate-600 text-sm">{exercise.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showExerciseDetails[name] ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showExerciseDetails[name] && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h5 className="font-bold mb-3 text-emerald-600">How to perform:</h5>
                      <ol className="space-y-2">
                        {exercise.steps.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-slate-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Progress */}
      <section id="progress" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Training Progress</h2>
          <p className="text-lg text-slate-600">Track your journey to race day success</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {Object.entries(trainingPlan).map(([weekNum]) => {
            const completedDaysCount = Object.keys(completedDays).filter(key => 
              key.startsWith(`week${weekNum}-`) && completedDays[key]
            ).length;
            const progressPercent = (completedDaysCount / 7) * 100;
            
            return (
              <div key={weekNum} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">Week {weekNum}</h3>
                  {isWeekCompleted(parseInt(weekNum)) && (
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-green-600" />
                    </div>
                  )}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium text-sm md:text-base">{completedDaysCount}/7 days</span>
                  <span className="text-emerald-600 font-bold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="mt-2 text-xs md:text-sm text-slate-500">{trainingPlan[parseInt(weekNum)].title}</div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress Stats */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{getTotalCompletedDays()}/56</div>
              <div className="text-emerald-100">Total Days Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{Object.values(trainingPlan).filter((_, i) => isWeekCompleted(i + 1)).length}/8</div>
              <div className="text-emerald-100">Weeks Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{Math.round((getTotalCompletedDays() / 56) * 100)}%</div>
              <div className="text-emerald-100">Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Race Week Nutrition (Collapsible) */}
        <div id="nutrition" className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
          <button
            onClick={() => setShowNutritionPlan(!showNutritionPlan)}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-emerald-100/50 transition-colors"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                🍽️ Race Week Nutrition Plan
              </h3>
              <p className="text-slate-600 text-base md:text-lg">Complete fueling strategy for optimal performance</p>
            </div>
            <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform ${showNutritionPlan ? 'rotate-180' : ''}`} />
          </button>
          
          {showNutritionPlan && (
            <div className="p-6 md:p-8 pt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: '7-4 Days Before', items: ['Balanced diet with normal fiber', 'Lean protein, whole grains, veggies', 'Light-yellow urine for hydration', 'Avoid alcohol, spicy, fried foods'] },
                  { title: '3 Days Before', items: ['Start reducing fiber', 'White rice, potatoes, pasta, bagels', 'Bananas, pretzels, rice cakes', 'Add electrolytes/salt'] },
                  { title: '2 Days Before', items: ['Carb-load: 8-10g carbs/kg body weight', 'Bagels + jam, pancakes + honey', 'White rice + lean protein', 'Sports drinks, fruit juices'] },
                  { title: 'Race Morning', items: ['3-4h before: White toast + jam', '90min before: 30-60g carbs', '15min before: 25g carbs (gel)', 'Caffeine: 1-3mg/kg if used to it'] },
                  { title: 'During Race', items: ['Sip water at aid stations', '1 gel around km 8-10', 'Another gel if needed later', 'Listen to your body'] },
                  { title: 'Post-Race', items: ['Within 60min: Recovery smoothie', '500ml water/hour for 2+ hours', 'Balanced meals: carbs + protein', 'Celebrate your achievement! 🎉'] }
                ].map((phase, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-emerald-100">
                    <h4 className="text-lg font-bold text-emerald-600 mb-3">{phase.title}</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final Motivation */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
            <span>You&apos;ve Got This, Micha!</span>
            <Trophy className="w-10 md:w-12 h-10 md:h-12 text-yellow-300" />
          </h2>
          <p className="text-lg md:text-2xl mb-6 md:mb-8 text-emerald-100">
            Every mile in training brings you closer to your 1:45:00 goal at the London Big Half Marathon.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 md:px-8 py-4 md:py-6 inline-block">
            <p className="text-lg md:text-xl font-semibold text-yellow-200">
              &ldquo;The miracle isn&apos;t that I finished. The miracle is that I had the courage to start.&rdquo;
            </p>
            <p className="text-emerald-100 mt-2">- John Bingham</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonTrainingDashboard;